package com.nox.moviegate.endpoints;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nox.moviegate.model.Movie;
import com.nox.moviegate.service.MovieService;

@RestController
@RequestMapping(value = "/rest/movies")
public class MovieEndpoints {
	
	@Autowired
	private MovieService movieService;
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public void saveMovie(@RequestBody Movie movie) throws Exception{
		
		movieService.saveMovie(movie);
		
	}
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
	public Movie getMovie(@RequestParam(value="id") String id, 
			@RequestParam(value="username") String username){
		
		return movieService.getMovie(id, username);
		
	}
	@RequestMapping(value = "/{username}", method = RequestMethod.GET, produces="application/json")
	public List<Movie> getMoviesForUser(@PathVariable("username") String username){
		List<Movie> movies = movieService.getMoviesForUser(username);
		return movies;
	}
	
	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void deleteMovie(@RequestParam(value="id") String id, 
			@RequestParam(value="username") String username){
		
		movieService.deleteMovie(id, username);
		
	}
	@RequestMapping(value = "", method = RequestMethod.PATCH)
	public void updateMovie(@RequestBody Movie movie){
		movieService.updateMovie(movie);
	}
	
	public List<Movie> search(@PathVariable("title") String title,
			@PathVariable("category") String category,
			@PathVariable("mainActor") String mainActor,
			@PathVariable("releaseDate") String releaseDate){
		
		return movieService.search(title, category, mainActor, releaseDate);
		
	}

}
