package com.nox.moviegate.dao;

import java.util.List;

import com.nox.moviegate.model.User;
import com.nox.moviegate.model.UserDB;

public interface UserDao {
	
	public void insertUser(UserDB user);
	public UserDB getUser(String username);
	public void deleteUser(String username);
	public List<User> getAllUsers();
	public User findUser(String username);
	public void updateUser(User user);

}
