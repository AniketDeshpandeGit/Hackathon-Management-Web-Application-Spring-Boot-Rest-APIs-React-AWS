package com.openHack.io.entity;

import javax.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "teamMembersTeam")
public class TeamMembersTeam implements Serializable{

	private static final long serialVersionUID = -2974038348995949230L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private long teamId;
	
	private long memberId;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
	}

	public long getMemberId() {
		return memberId;
	}

	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}


	
	
	
	
}
