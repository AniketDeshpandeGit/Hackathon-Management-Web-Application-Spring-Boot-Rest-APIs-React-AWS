package com.openHack.shared.dto;

public class TeamMemberDto {
	private long id;
	private long userId;
	private String role;
	private boolean paid;
	private long hackathonId;
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public boolean isPaid() {
		return paid;
	}
	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getHackathonId() {
		return hackathonId;
	}
	public void setHackathonId(long hackathonId) {
		this.hackathonId = hackathonId;
	}
	
	
	
}
