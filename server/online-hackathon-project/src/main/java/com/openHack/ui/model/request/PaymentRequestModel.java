package com.openHack.ui.model.request;

public class PaymentRequestModel {
	private String userEmail;
	private double amount;
	private String hackathonName;
	private String paymentTime;
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getHackathonName() {
		return hackathonName;
	}
	public void setHackathonName(String hackathonName) {
		this.hackathonName = hackathonName;
	}
	public String getPaymentTime() {
		return paymentTime;
	}
	public void setPaymentTime(String paymentTime) {
		this.paymentTime = paymentTime;
	}
	
	
}
