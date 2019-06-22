package com.openHack.ui.model.request;

public class TeamMemberDetailsRequestModel {

	private long userId;
	private String role = "programmer";
	private boolean paid = false;
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
	
	public long getHackathonId() {
		return hackathonId;
	}
	public void setHackathonId(long hackathonId) {
		this.hackathonId = hackathonId;
	}
	@Override
	public String toString() {
		return "TeamMemberDetailsRequestModel [userId=" + userId + ", role=" + role + ", paid=" + paid + "]";
	}
	
	
	
}
