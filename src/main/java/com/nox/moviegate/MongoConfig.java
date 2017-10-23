package com.nox.moviegate;

import java.net.UnknownHostException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.MongoClient;

@Configuration
public class MongoConfig {

	public @Bean MongoTemplate mongoTemplate() throws UnknownHostException{
		MongoTemplate mongoTemplate = new MongoTemplate(new MongoClient("127.0.0.1"), "moviegate");
		return mongoTemplate;
	}
	
}
