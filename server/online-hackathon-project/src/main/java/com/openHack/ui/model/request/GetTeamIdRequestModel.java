package com.openHack.ui.model.request;

public class GetTeamIdRequestModel {
	private long userId;
	private long hackathonId;
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public long getHackathonId() {
		return hackathonId;
	}
	public void setHackathonId(long hackathonId) {
		this.hackathonId = hackathonId;
	}
}
