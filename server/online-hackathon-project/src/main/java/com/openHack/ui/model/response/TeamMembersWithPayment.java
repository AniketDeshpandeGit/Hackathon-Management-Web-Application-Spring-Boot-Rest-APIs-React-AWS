package com.openHack.ui.model.response;

public class TeamMembersWithPayment {
	private String teamMemberName;
	private String amountPaid;
	private String timePaid;
	public String getTeamMemberName() {
		return teamMemberName;
	}
	public void setTeamMemberName(String teamMemberName) {
		this.teamMemberName = teamMemberName;
	}
	public String getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(String amountPaid) {
		this.amountPaid = amountPaid;
	}
	public String getTimePaid() {
		return timePaid;
	}
	public void setTimePaid(String timePaid) {
		this.timePaid = timePaid;
	}
}
