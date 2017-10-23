package com.nox.moviegate.endpoints;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nox.moviegate.model.User;
import com.nox.moviegate.service.UserService;
import com.nox.moviegate.validation.ValidationError;
import com.nox.moviegate.validation.ValidationErrorBuilder;

@RestController
@RequestMapping(value = "/rest/users")
public class UserEndpoints {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public void register(@RequestBody User user) throws Exception{
		userService.saveUser(user);
	}
	
	@RequestMapping(value = "/signin", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody User signin(@RequestBody User user) throws Exception{
		User u = userService.findUser(user.getUsername(), user.getPassword());
		return u;
	}
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<User> getUsers(){
		return userService.getAllUsers();
	}
	@RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable("username") String username){
		userService.deleteUser(username);
	}
	@RequestMapping(value = "/{username}", method = RequestMethod.GET, produces = "application/json")
	public User findUser(@PathVariable("username") String username){
		return userService.findUser(username);
	}
	@RequestMapping(value = "", method = RequestMethod.PATCH)
	public void updateUser(@RequestBody User user){
		userService.updateUser(user);
	}
	@ExceptionHandler
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ValidationError handleException(MethodArgumentNotValidException exception) {
        return createValidationError(exception);
    }
	
	private ValidationError createValidationError(MethodArgumentNotValidException e) {
        return ValidationErrorBuilder.fromBindingErrors(e.getBindingResult());
    }

}
