package com.openHack.io.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.openHack.embeddedEntity.Address;

@Entity(name="organizations")
public class OrganizationEntity implements Serializable{

	private static final long serialVersionUID = 8989459594559579715L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, unique = true)
	private String name;
		
	private String description;
	
	@Column
	@Embedded
	private Address address;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinTable(name="organization_join_request", joinColumns = @JoinColumn(name="organization_id"), inverseJoinColumns = @JoinColumn(name="user_id"))
	private List<UserEntity> users;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name = "ownerId")
	private UserEntity userEnity;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<UserEntity> getUsers() {
		return users;
	}

	public void setUsers(List<UserEntity> users) {
		this.users = users;
	}
	public void addUser(UserEntity userEntity) {
		if(users == null)
			users = new ArrayList<>();
		users.add(userEntity);
	}

	public UserEntity getUserEnity() {
		return userEnity;
	}

	public void setUserEnity(UserEntity userEnity) {
		this.userEnity = userEnity;
	}

	@Override
	public String toString() {
		return "OrganizationEntity [id=" + id + ", name=" + name + ", description=" + description + ", address="
				+ address + ", users=" + users + ", userEnity=" + userEnity + "]";
	}

	
	
}
