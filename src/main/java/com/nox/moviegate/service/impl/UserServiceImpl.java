package com.nox.moviegate.service.impl;

import java.security.MessageDigest;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nox.moviegate.dao.UserDao;
import com.nox.moviegate.model.User;
import com.nox.moviegate.model.UserDB;
import com.nox.moviegate.service.UserService;

@Component
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userDao;

	@Override
	public void saveUser(User user) throws Exception {
		User u = findUser(user.getUsername());
		if (u != null){
			throw new Exception("User already exists");
		}
		UserDB userDB = new UserDB(user);
		String password = user.getPassword();
		byte[] passwordEncoded = null;
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		passwordEncoded = md.digest(password.getBytes("UTF-8"));
		userDB.setPassword(passwordEncoded);
		userDao.insertUser(userDB);
	}

	@Override
	public User findUser(String username, String password) throws Exception {
		UserDB user = userDao.getUser(username);
		if(user != null) {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			byte[] passEncoded = user.getPassword();
			if(Arrays.equals(md.digest(password.getBytes("UTF-8")), passEncoded)){
				return new User(user);
			}else {
				return null;
			}
		}
		return null;
		
	}

	@Override
	public List<User> getAllUsers() {
		return userDao.getAllUsers();
	}

	@Override
	public void deleteUser(String username) {
		userDao.deleteUser(username);
		
	}

	@Override
	public User findUser(String username) {
		return userDao.findUser(username);
		
	}

	@Override
	public void updateUser(User user) {
		userDao.updateUser(user);
		
	}

}
