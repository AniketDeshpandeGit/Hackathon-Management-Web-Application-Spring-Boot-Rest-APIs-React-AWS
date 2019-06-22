package com.openHack.ui.model.request;

public class GradeTeamsRequestModel {
	private String teamName;
	private String hackathonName;
	private double grade;
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getHackathonName() {
		return hackathonName;
	}
	public void setHackathonName(String hackathonName) {
		this.hackathonName = hackathonName;
	}
	public double getGrade() {
		return grade;
	}
	public void setGrade(double grade) {
		this.grade = grade;
	}
}
