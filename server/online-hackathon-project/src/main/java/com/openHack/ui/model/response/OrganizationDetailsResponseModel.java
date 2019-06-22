package com.openHack.ui.model.response;

import com.openHack.embeddedEntity.Address;
import com.openHack.io.entity.UserEntity;
public class OrganizationDetailsResponseModel {
	private long id;
	private String name;
//	private UserEntity userEntity;
	private String description;
	private Address address;
	
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
		this.name = name.substring(0,1).toUpperCase() + name.substring(1);
	}
	
//	public UserEntity getUserEntity() {
//		return userEntity;
//	}
//	public void setUserEntity(UserEntity userEntity) {
//		this.userEntity = userEntity;
//	}
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
	
	@Override
	public String toString() {
		return "OrganizationDetailsResponseModel [id=" + id + ", name=" + name + ", description=" + description
				+ ", address=" + address + "]";
	}
	
	
}
