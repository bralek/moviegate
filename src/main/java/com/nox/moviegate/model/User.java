package com.nox.moviegate.model;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "users")
public class User {
	
	@NotBlank(message = "username must not be blank")
	private String username;
	@NotBlank(message = "password must not be blank")
	private String password;
	private String firstname;
	private String lastname;
	@NotBlank(message = "email must not be blank")
	private String email;
	private String role;
	
	public User(UserDB user) {
		this.username = user.getUsername();
		this.firstname = user.getFirstname();
		this.lastname = user.getLastname();
		this.email = user.getEmail();
		this.role = user.getRole();
	}
	
	public User(){
		
	}
	
	@JsonProperty(value="username")
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	@JsonProperty(value="password")
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@JsonProperty(value="firstname")
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	@JsonProperty(value="lastname")
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	@JsonProperty(value="email")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@JsonProperty(value="role")
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

}
