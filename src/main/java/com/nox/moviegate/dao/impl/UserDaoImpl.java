package com.nox.moviegate.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.nox.moviegate.dao.UserDao;
import com.nox.moviegate.model.User;
import com.nox.moviegate.model.UserDB;

@Component
public class UserDaoImpl implements UserDao{
	
	@Autowired
	ApplicationContext ctx;
	
	@Autowired
	MongoTemplate mongo;

	@Override
	public void insertUser(UserDB user) {
		mongo.save(user);
	}

	@Override
	public UserDB getUser(String username) {
		UserDB user = mongo.findOne(new Query().addCriteria(Criteria.where("username").is(username)), UserDB.class);
		return user;
		
	}

	@Override
	public void deleteUser(String username) {
		mongo.remove(new Query().addCriteria(Criteria.where("username").is(username)), User.class);
		
	}
	
	@Override
	public List<User> getAllUsers(){
		List<User> users = mongo.find(new Query().addCriteria(Criteria.where("role").is("User")), User.class);
		return users;
	}

	@Override
	public User findUser(String username) {
		User user = mongo.findOne(new Query().addCriteria(Criteria.where("username").is(username)), User.class);
		return user;
	}

	@Override
	public void updateUser(User user) {
		Update update = new Update();
		update.set("password", user.getPassword());
		update.set("firstname", user.getFirstname());
		update.set("lastname", user.getLastname());
		update.set("email", user.getEmail());
		update.set("role", user.getRole());
		mongo.updateFirst(new Query().addCriteria(Criteria.where("username").is(user.getUsername())), update, User.class);
		
		
	}

}
