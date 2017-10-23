package com.nox.moviegate.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies")
public class MovieDB {
	
	private String id;
	private String title;
	private String category;
	private Date releaseDate;
	private String mainActor;
	private String imageUrl;
	private String username;
	
	public MovieDB() {
		
	}
	
	public MovieDB(Movie movie) throws ParseException {
		this.id = movie.getId();
		this.title = movie.getTitle();
		this.category = movie.getCategory();
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-mm-DD");
		this.releaseDate = sdf.parse(movie.getReleaseDate());
		this.mainActor = movie.getMainActor();
		this.imageUrl = movie.getImageUrl();
		this.username = movie.getUsername();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Date getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	public String getMainActor() {
		return mainActor;
	}
	public void setMainActor(String mainActor) {
		this.mainActor = mainActor;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
