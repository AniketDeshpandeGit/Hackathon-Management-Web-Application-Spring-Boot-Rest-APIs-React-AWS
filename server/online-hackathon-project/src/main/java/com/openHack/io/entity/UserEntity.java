package com.openHack.io.entity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.openHack.io.entity.OrganizationEntity;

@Entity(name = "users")
public class UserEntity implements Serializable{
	private static final long serialVersionUID = 1464447855335313510L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, unique = true)
	private String userName;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	private String password;
	
	private String portraitUrl;
	
	@Column(nullable = false)
	private boolean isEmailVerfied;
	
	public boolean isEmailVerfied() {
		return isEmailVerfied;
	}

	public void setEmailVerfied(boolean isEmailVerfied) {
		this.isEmailVerfied = isEmailVerfied;
	}

	@OneToOne(fetch = FetchType.LAZY, cascade= {CascadeType.DETACH,CascadeType.MERGE ,CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumn(name="organizationId")
	private OrganizationEntity organizationEntity;
	
	private String title; // business title
	
	private String about;
	
	
	@Column(columnDefinition = "boolean default false")
	private boolean adminCheck;
	
	private String street; 
    
	private String city;
    
	private String state;
    
	private String zip;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinTable(name="organization_join_request", joinColumns = @JoinColumn(name="user_id"), 
												 inverseJoinColumns = @JoinColumn(name="organization_id"))
	private List<OrganizationEntity> organizations;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinTable(name="judges", joinColumns = @JoinColumn(name="judge_id"), 
												 inverseJoinColumns = @JoinColumn(name="hackathon_id"))
	private List<HackathonEntity> hackathons;
	
	@OneToMany(mappedBy = "userEnity", fetch=FetchType.LAZY, cascade= {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	private List<OrganizationEntity> organizationEntities;
	
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

	public OrganizationEntity getOrganizationEntity() {
		return organizationEntity;
	}

	public void setOrganizationEntity(OrganizationEntity organizationEntity) {
		this.organizationEntity = organizationEntity;
	}

	public boolean isAdminCheck() {
		return adminCheck;
	}

	public void setAdminCheck(boolean adminCheck) {
		this.adminCheck = adminCheck;
	}
	
	public List<OrganizationEntity> getOrganizations() {
		return organizations;
	}

	public void setOrganizations(List<OrganizationEntity> organizations) {
		this.organizations = organizations;
	}

	public void addOrganization(OrganizationEntity organizationEntity) {
		if(organizations == null)
			organizations = new ArrayList<>();
		
		organizations.add(organizationEntity);
	}
	
	public List<HackathonEntity> getHackathons() {
		return hackathons;
	}

	public void setHackathons(List<HackathonEntity> hackathons) {
		this.hackathons = hackathons;
	}
	
	public void addHackathon(HackathonEntity hackthon) {
		if(hackathons == null)
			hackathons = new ArrayList<>();
		hackathons.add(hackthon);
	}
	
	public void addOrganizationOfUser(OrganizationEntity organizationEntity) {
		if(organizationEntities == null)
			organizationEntities = new ArrayList<>();
		organizationEntities.add(organizationEntity);
	}
	    

	public List<OrganizationEntity> getOrganizationEntities() {
		return organizationEntities;
	}

	public void setOrganizationEntities(List<OrganizationEntity> organizationEntities) {
		this.organizationEntities = organizationEntities;
	}

	
	
}
