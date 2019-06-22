package com.openHack.ui.model.request;

public class JoinHackathon {
	private long user_id;
	private long hackathon_id;
	public long getUser_id() {
		return user_id;
	}
	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}
	public long getHackathon_id() {
		return hackathon_id;
	}
	public void setHackathon_id(long hackathon_id) {
		this.hackathon_id = hackathon_id;
	}
	
}
