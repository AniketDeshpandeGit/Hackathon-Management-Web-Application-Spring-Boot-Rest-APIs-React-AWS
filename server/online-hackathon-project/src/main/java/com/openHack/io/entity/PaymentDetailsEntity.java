package com.openHack.io.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="payments")
public class PaymentDetailsEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false, unique = true)
	private double amountPaid;
	
	@Column(nullable = false, unique = true)
	private String userEmail;
	
	public double getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getPaymentTime() {
		return paymentTime;
	}

	public void setPaymentTime(String paymentTime) {
		this.paymentTime = paymentTime;
	}

	public String getHackathonName() {
		return hackathonName;
	}

	public void setHackathonName(String hackathonName) {
		this.hackathonName = hackathonName;
	}

	@Column(nullable = false)
	private String paymentTime;

	@Column(nullable = false)
	private String hackathonName;
}
