package com.openHack.ui.model.request;

public class SubmissionDetailsRequestModel {
	private String submission_link;

	public String getSubmission_link() {
		return submission_link;
	}

	public void setSubmission_link(String submission_link) {
		this.submission_link = submission_link;
	}

	@Override
	public String toString() {
		return "SubmissionDetailsRequestModel [submission_link=" + submission_link + "]";
	}
	
	
	
}
