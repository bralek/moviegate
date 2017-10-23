package com.nox.moviegate.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nox.moviegate.dao.MovieDao;
import com.nox.moviegate.model.Movie;
import com.nox.moviegate.model.MovieDB;
import com.nox.moviegate.service.MovieService;

@Component
public class MovieServiceImpl implements MovieService{

	@Autowired
	private MovieDao movieDao;
	
	@Override
	public void saveMovie(Movie movie) throws Exception {
		MovieDB movieDb = new MovieDB(movie);
		movieDao.insertMovie(movieDb);
		
	}

	@Override
	public Movie getMovie(String id, String username) {
		MovieDB movie = movieDao.getMovie(id, username);
		try {
			return new Movie(movie);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void deleteMovie(String id, String username) {
		movieDao.deleteMovie(id, username);
		
	}

	@Override
	public List<Movie> getMoviesForUser(String username) {
		List<MovieDB> moviesDB = movieDao.getMoviesByUsername(username);
		List<Movie> movies = new ArrayList<>();
		for (MovieDB movieDB : moviesDB) {
			try {
				movies.add(new Movie(movieDB));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return movies;
	}

	@Override
	public void updateMovie(Movie movie) {
		try {
			movieDao.updateMovie(new MovieDB(movie));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public List<Movie> search(String title, String category, String mainActor, String releaseDate) {
		List<Movie> movies = new ArrayList<>();
		List<MovieDB> moviesDB = movieDao.search(title, category, mainActor, releaseDate);
		for (MovieDB movieDB : moviesDB) {
			try {
				movies.add(new Movie(movieDB));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return movies;
	}

}
