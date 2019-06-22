package com.openHack.shared.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.openHack.embeddedEntity.Address;
import com.openHack.io.entity.OrganizationEntity;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

	private long id;
	private String userName;
	private String email;
	private String password;
	private String portraitUrl;
	private String title; // business title
	private String about;
	private String street; 
    private String city;
    private String state;
    private String zip;
	private List<OrganizationEntity> organizationEntity;
    
    private boolean adminCheck = false;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public boolean isAdminCheck() {
		return adminCheck;
	}
	public void setAdminCheck(boolean adminCheck) {
		this.adminCheck = adminCheck;
	}
	
	public List<OrganizationEntity> getOrganizationEntity() {
		return organizationEntity;
	}
	public void setOrganizationEntity(List<OrganizationEntity> organizationEntity) {
		this.organizationEntity = organizationEntity;
	}
	@Override
	public String toString() {
		return "UserDto [id=" + id + ", userName=" + userName + ", email=" + email + ", password=" + password
				+ ", portraitUrl=" + portraitUrl + ", title=" + title + ", about=" + about + ", street=" + street
				+ ", city=" + city + ", state=" + state + ", zip=" + zip + ", adminCheck=" + adminCheck
				+ ", isEmailVerfied=" + isEmailVerfied + "]";
	}
	
	
}


