package com.openHack.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.json.JsonObject;
import com.openHack.shared.dto.TeamDto;
import com.openHack.shared.dto.TeamsByJudgeDto;
import com.openHack.ui.model.request.GetTeamIdRequestModel;
import com.openHack.ui.model.request.GradeTeamsRequestModel;
import com.openHack.ui.model.request.SubmissionDetailsRequestModel;
import com.openHack.ui.model.request.teamMemberAmountToPayRequestModel;
import com.openHack.ui.model.response.TeamDetailsResposeModel;
import com.openHack.ui.model.response.TeamMemberAmountToPayWithDisReponseModel;
import com.openHack.ui.model.response.TeamMembersWithPayment;

public interface TeamService {
	TeamDto createTeam(TeamDto teamDto) throws IOException;
	TeamDto getTeamById(long id);
	ArrayList<TeamsByJudgeDto> getTeamByJudge(long id);
	TeamDto updateTeam(long id, TeamDto teamDto);
	void createSubmission(long id, SubmissionDetailsRequestModel submission);
	void createPayment(long id);
	void payment(String userEmail, double amount, String hackathonName, String paymentTime);
	void gradeTeam(long id, double grade);
	void gradeTeamWithName(GradeTeamsRequestModel gradeTeam);
	JsonObject getTeamId(GetTeamIdRequestModel getTeamId);
	ArrayList<TeamDto> getTeamsForEvaluation(long id);
	public TeamMemberAmountToPayWithDisReponseModel getAmountToPay(teamMemberAmountToPayRequestModel user);
	HashMap<String, ArrayList<TeamMembersWithPayment>> getPaymentDetails(String hackathonName);
}
