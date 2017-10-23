package com.nox.moviegate.service;

import java.util.List;

import com.nox.moviegate.model.Movie;

public interface MovieService {
	
	public void saveMovie(Movie movie) throws Exception;
	public Movie getMovie(String title, String username);
	public void deleteMovie(String title, String username);
	public List<Movie> getMoviesForUser(String username);
	public void updateMovie(Movie movie);
	public List<Movie> search(String title, String category, String mainActor, String releaseDate);

}
