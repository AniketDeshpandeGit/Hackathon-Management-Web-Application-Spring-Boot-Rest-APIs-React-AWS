package com.openHack.ui.model.request;

public class teamMemberAmountToPayRequestModel {
	private String teamMemberEmail ;
	private String hackthonName;
	
	public String getTeamMemberEmail() {
		return teamMemberEmail;
	}
	public void setTeamMemberEmail(String teamMemberEmail) {
		this.teamMemberEmail = teamMemberEmail;
	}
	public String getHackthonName() {
		return hackthonName;
	}
	public void setHackthonName(String hackthonName) {
		this.hackthonName = hackthonName;
	}
}
