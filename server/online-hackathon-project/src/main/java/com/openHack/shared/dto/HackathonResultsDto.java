package com.openHack.shared.dto;

import java.util.ArrayList;

public class HackathonResultsDto {
   //team names
   //team score
   //team members
   
	private String teamName;
	private double teamScore;
	private ArrayList<UserDto> teamMembers;
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public double getTeamScore() {
		return teamScore;
	}
	public void setTeamScore(double teamScore) {
		this.teamScore = teamScore;
	}
	public ArrayList<UserDto> getTeamMembers() {
		return teamMembers;
	}
	public void setTeamMembers(ArrayList<UserDto> teamMembers) {
		this.teamMembers = teamMembers;
	}
	
}
