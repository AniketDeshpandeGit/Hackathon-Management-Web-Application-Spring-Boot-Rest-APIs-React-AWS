package com.openHack.shared.dto;

import com.openHack.embeddedEntity.Address;
import com.openHack.io.entity.UserEntity;

public class OrganizationDto {
	private long id;
	private String name;
	private UserEntity userEntity;
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
		this.name = name;
	}
	public UserEntity getUserEntity() {
		return userEntity;
	}
	public void setUserEntity(UserEntity userEntity) {
		this.userEntity = userEntity;
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
	@Override
	public String toString() {
		return "OrganizationDto [id=" + id + ", name=" + name + ", userEntity=" + userEntity + ", description="
				+ description + ", address=" + address + "]";
	}
	
}
