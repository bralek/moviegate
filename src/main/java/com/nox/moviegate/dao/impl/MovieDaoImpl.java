package com.nox.moviegate.dao.impl;

import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.nox.moviegate.dao.MovieDao;
import com.nox.moviegate.model.MovieDB;

@Component
public class MovieDaoImpl implements MovieDao{
	
	@Autowired
	private MongoTemplate mongo;

	@Override
	public void insertMovie(MovieDB movie) {
		mongo.save(movie);
		
	}

	@Override
	public MovieDB getMovie(String id, String username) {
		MovieDB movie = mongo.findOne(new Query().addCriteria(Criteria.where("id").is(id).and("username").is(username)), MovieDB.class);
		return movie;
	}

	@Override
	public void deleteMovie(String id, String username) {
		mongo.remove(new Query().addCriteria(Criteria.where("id").is(id).and("username").is(username)), MovieDB.class);
		
	}

	@Override
	public List<MovieDB> getMoviesByUsername(String username) {
		return mongo.find(new Query().addCriteria(Criteria.where("username").is(username)), MovieDB.class);
	}

	@Override
	public void updateMovie(MovieDB movie) {
		Update update = new Update();
		update.set("category", movie.getCategory());
		update.set("mainActor", movie.getMainActor());
		update.set("releaseDate", movie.getReleaseDate());
		update.set("imageUrl", movie.getImageUrl());
		mongo.updateFirst(new Query().addCriteria(Criteria.where("title").is(movie.getTitle())), update, MovieDB.class);
		
	}

	@Override
	public List<MovieDB> search(String title, String category, String mainActor, String releaseDate) {
		Query q = new Query();
		if (title != null && !("").equals(title)){
			q.addCriteria(Criteria.where("title").regex(title));
		}
		if (category != null && !("").equals(category)){
			q.addCriteria(Criteria.where("category").regex(category));
		}
		if (mainActor != null && !("").equals(mainActor)){
			q.addCriteria(Criteria.where("mainActor").regex(mainActor));
		}
		if (releaseDate != null && !("").equals(releaseDate)) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("YYYY-mm-DD");
				Date date = sdf.parse(releaseDate);
				q.addCriteria(Criteria.where("releaseDate").is(date));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		return mongo.find(q, MovieDB.class);
	}

}
