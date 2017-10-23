package com.nox.moviegate.service;

import java.util.List;

import com.nox.moviegate.model.User;

public interface UserService {
	
	public void saveUser(User user)  throws Exception;
	public User findUser(String username, String password) throws Exception;
	public List<User> getAllUsers();
	public void deleteUser(String username);
	public User findUser(String username);
	public void updateUser(User user);
}
