package com.openHack.ui.model.request;

import com.openHack.embeddedEntity.Address;
import com.openHack.io.entity.UserEntity;


public class OrganizationDetailsRequestModel {
	private String name;
	private String description;
	private Address address;
	private long ownerId;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name.toLowerCase();
	}
			
	public long getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(long ownerId) {
		this.ownerId = ownerId;
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
		return "OrganizationDetailsRequestModel [name=" + name + ", description=" + description + ", address=" + address
				+ ", ownerId=" + ownerId + "]";
	}
	
}
