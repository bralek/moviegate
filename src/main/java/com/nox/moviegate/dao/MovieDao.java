package com.nox.moviegate.dao;

import java.util.List;

import com.nox.moviegate.model.MovieDB;

public interface MovieDao {
	
	public void insertMovie(MovieDB movie);
	public MovieDB getMovie(String title, String username);
	public void deleteMovie(String title, String username);
	public List<MovieDB> getMoviesByUsername(String username);
	public void updateMovie(MovieDB movie);
	public List<MovieDB> search(String title, String category, String mainActor, String releaseDate);

}
