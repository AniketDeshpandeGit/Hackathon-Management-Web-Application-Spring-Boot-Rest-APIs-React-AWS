package com.openHack.ui.model.response;

public class EarningReportResponseModel {
	private double revenue;
	private double unpaid;
	private double revnueFromSponsorers;
	private double TotalExpenses; 
	private double Profit;
	public double getRevenue() {
		return revenue;
	}
	public void setRevenue(double revenue) {
		this.revenue = revenue;
	}
	public double getUnpaid() {
		return unpaid;
	}
	public void setUnpaid(double unpaid) {
		this.unpaid = unpaid;
	}
	public double getRevnueFromSponsorers() {
		return revnueFromSponsorers;
	}
	public void setRevnueFromSponsorers(double revnueFromSponsorers) {
		this.revnueFromSponsorers = revnueFromSponsorers;
	}
	public double getTotalExpenses() {
		return TotalExpenses;
	}
	public void setTotalExpenses(double totalExpenses) {
		TotalExpenses = totalExpenses;
	}
	public double getProfit() {
		return Profit;
	}
	public void setProfit(double profit) {
		Profit = profit;
	}
	
}
