package com.openHack.io.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;


@Entity(name="hackathons")
public class HackathonEntity implements Serializable{

	private static final long serialVersionUID = -2974038348995949230L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String eventName;
	
	@Column(nullable = false)
	private String startTime;
	
	@Column(nullable = false)
	private String endTime;
	
	@Column(nullable = false, length = 10)
	private String description;
	
	@Column(nullable = false)
	private String fee;
	
	@Column(nullable = false)
	private String minTeamSize;
	
	@Column(nullable = false)
	private String maxTeamSize;
	
	@Column(nullable = false) 
	private boolean hackatonWinner;
	
	@Column(nullable = false)
	private String createdBy;
	
	@Column
	private String status;
	
	@Column
	private String sponsorers;
	
	public String getSponsorers() {
		return sponsorers;
	}

	public void setSponsorers(String sponsorers) {
		this.sponsorers = sponsorers;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	@Column
	private double discount;
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@ManyToMany(fetch = FetchType.LAZY, cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinTable(name="judges", joinColumns = @JoinColumn(name="hackathon_id"), inverseJoinColumns = @JoinColumn(name="judge_id"))
	private List<UserEntity> judges;
	
//	@OneToMany(mappedBy = "hackathon_id", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	private List<SubmissionEntity> teamAssociate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFee() {
		return fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public String getMinTeamSize() {
		return minTeamSize;
	}

	public void setMinTeamSize(String minTeamSize) {
		this.minTeamSize = minTeamSize;
	}

	public String getMaxTeamSize() {
		return maxTeamSize;
	}

	public void setMaxTeamSize(String maxTeamSize) {
		this.maxTeamSize = maxTeamSize;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public List<UserEntity> getJudges() {
		return judges;
	}

	public void setJudges(List<UserEntity> judges) {
		this.judges = judges;
	}
	
	public void addJudge(UserEntity userEntity) {
		if(judges == null)
			judges = new ArrayList<>();
		judges.add(userEntity);
	}

	public boolean isHackatonWinner() {
		return hackatonWinner;
	}

	public void setHackatonWinner(boolean hackatonWinner) {
		this.hackatonWinner = hackatonWinner;
	}
	
	
	
//	public List<SubmissionEntity> getTeamAssociate() {
//		return teamAssociate;
//	}
//
//	public void setTeamAssociate(List<SubmissionEntity> teamAssociate) {
//		this.teamAssociate = teamAssociate;
//	}
//	
//	public void addTeamAssociate(SubmissionEntity submission) {
//		if(teamAssociate == null)
//			teamAssociate = new ArrayList<>();
//		teamAssociate.add(submission);
//	}
	
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	

	
}
