package com.nox.moviegate.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.hibernate.validator.constraints.NotBlank;

public class Movie {
	
	private String id;
	@NotBlank(message = "Title must not be blank")
	private String title;
	private String category;
	private String releaseDate;
	private String mainActor;
	private String imageUrl;
	private String username;
	
	public Movie(){
		
	}
	
	public Movie(MovieDB movie) throws ParseException {
		this.id = movie.getId();
		this.title = movie.getTitle();
		this.category = movie.getCategory();
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-mm-DD");
		this.releaseDate = sdf.format(movie.getReleaseDate());
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
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
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
