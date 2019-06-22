package com.openHack.ui.model.response;

import java.util.ArrayList;

public class HackathonTeamsForJudgeResponseModel {
	private String hackathonStatus;
	private String hackathonName;
	private ArrayList<String> teamWithSubmissionLinks;
	public ArrayList<String> getTeamWithSubmissionLinks() {
		return teamWithSubmissionLinks;
	}
	public void setTeamWithSubmissionLinks(ArrayList<String> teamWithSubmissionLinks) {
		this.teamWithSubmissionLinks = teamWithSubmissionLinks;
	}
	public String getHackathonStatus() {
		return hackathonStatus;
	}
	public void setHackathonStatus(String hackathonStatus) {
		this.hackathonStatus = hackathonStatus;
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
	private double grade;
}
