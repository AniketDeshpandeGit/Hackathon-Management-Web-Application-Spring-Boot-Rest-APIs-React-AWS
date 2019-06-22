package com.openHack.ui.model.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDetailsResponseModel {
	private long id;
	private String userName;
	private String email;
	private String portraitUrl;
	private String title; // business title
	private String about;
	private String street; 
    
	private String city;
    
	private String state;
    
	private String zip;
	private boolean isEmailVerfied;
	
	public boolean isEmailVerfied() {
		return isEmailVerfied;
	}
	public void setEmailVerfied(boolean isEmailVerfied) {
		this.isEmailVerfied = isEmailVerfied;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPortraitUrl() {
		return portraitUrl;
	}
	public void setPortraitUrl(String portraitUrl) {
		this.portraitUrl = portraitUrl;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	
	
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	@Override
	public String toString() {
		return "UserDetailsResponseModel [id=" + id + ", userName=" + userName + ", email=" + email + ", portraitUrl="
				+ portraitUrl + ", title=" + title + ", about=" + about + ", street=" + street + ", city=" + city
				+ ", state=" + state + ", zip=" + zip + ", isEmailVerfied=" + isEmailVerfied + "]";
	}
	
	
}


