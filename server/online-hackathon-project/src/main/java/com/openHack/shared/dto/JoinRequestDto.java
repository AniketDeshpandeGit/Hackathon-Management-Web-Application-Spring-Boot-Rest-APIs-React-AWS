package com.openHack.shared.dto;

public class JoinRequestDto {
	private long user_id;
	private long organization_id;
	public long getUser_id() {
		return user_id;
	}
	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}
	public long getOrganization_id() {
		return organization_id;
	}
	public void setOrganization_id(long organization_id) {
		this.organization_id = organization_id;
	}
	@Override
	public String toString() {
		return "SendJoinRequestDetailsModel [user_id=" + user_id + ", organization_id=" + organization_id + "]";
	}
}
