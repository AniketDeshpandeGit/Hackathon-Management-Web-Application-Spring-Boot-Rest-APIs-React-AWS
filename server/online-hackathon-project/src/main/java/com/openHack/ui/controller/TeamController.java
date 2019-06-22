package com.openHack.ui.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openHack.Config_url;
import com.openHack.io.entity.TeamMemberEntity;
import com.openHack.io.entity.TeamMembersTeam;
import com.openHack.io.repository.TeamRepository;
import com.openHack.service.TeamService;
import com.openHack.shared.dto.TeamDto;
import com.openHack.shared.dto.TeamsByJudgeDto;
import com.openHack.ui.model.request.GetTeamIdRequestModel;
import com.openHack.ui.model.request.GradeTeamsRequestModel;
import com.openHack.ui.model.request.HackathonDetailsRequestModel;
import com.openHack.ui.model.request.PaymentRequestModel;
import com.openHack.ui.model.request.SubmissionDetailsRequestModel;
import com.openHack.ui.model.request.TeamDetailsRequestModel;
import com.openHack.ui.model.request.teamMemberAmountToPayRequestModel;
import com.openHack.ui.model.response.HackathonDetailsResposeModel;
import com.openHack.ui.model.response.HackathonTeamsForJudgeResponseModel;
import com.openHack.ui.model.response.OrganizationDetailsResponseModel;
import com.openHack.ui.model.response.TeamDetailsResposeModel;
import com.openHack.ui.model.response.TeamMemberAmountToPayWithDisReponseModel;
import com.openHack.ui.model.response.TeamMembersWithPayment;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import javax.json.JsonObject;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("teams") // -> http://localhost:8080/teams
@CrossOrigin(origins = Config_url.url)
public class TeamController {

    @Autowired
    TeamService teamService;
    
    // create and add new Team
    @PostMapping
    public TeamDetailsResposeModel createTeam(@RequestBody TeamDetailsRequestModel teamDetailsRequestModel) throws IOException {

    	// TeamDetailsRequestModel object: contains input request data
    	
    	// response model to send data to UI
        TeamDetailsResposeModel returnModel = new TeamDetailsResposeModel();
    	
        // DTO object to hold the input request data
        TeamDto teamDto = new TeamDto();
        
        // transferring input data to DTO object matches multiple source property hierarchies:
        ObjectMapper mapper = new ObjectMapper();
        teamDto = mapper.convertValue(teamDetailsRequestModel, TeamDto.class);
        
        // Service method Call to insert data
        TeamDto createTeam = teamService.createTeam(teamDto);
       
        // Transferring DTO object data to response model
        mapper = new ObjectMapper();
        returnModel = mapper.convertValue(createTeam, TeamDetailsResposeModel.class);
           
        return returnModel;
    }

    // get any team by id
    @GetMapping(path="/{id}")
    public TeamDetailsResposeModel getTeam(@PathVariable long id) {

        // response model to send data to UI
        TeamDetailsResposeModel returnModel = new TeamDetailsResposeModel();

        // Service method Call to get team data based on id
        TeamDto teamDetails = teamService.getTeamById(id);
        
        // transferring DTO object data to response model
        ObjectMapper mapper = new ObjectMapper();
        returnModel = mapper.convertValue(teamDetails, TeamDetailsResposeModel.class);

        return returnModel;
    }
    
    // get teams by user id
    @GetMapping(path="getTeamsbyJudge/{id}")
    public ArrayList<TeamsByJudgeDto> getTeamsbyJudge(@PathVariable long id) {

        // response model to send data to UI
    	HackathonTeamsForJudgeResponseModel returnModel = new HackathonTeamsForJudgeResponseModel();

        // Service method Call to get team data based on id
    	ArrayList<TeamsByJudgeDto> teamByJudge = teamService.getTeamByJudge(id);
        
        // transferring DTO object data to response model
//        ObjectMapper mapper = new ObjectMapper();
//        returnModel = mapper.convertValue(teamByJudge, HackathonTeamsForJudgeResponseModel.class);

        return teamByJudge;
    }
    
    // get teams by hackathon id
    @GetMapping(path="evaluation/{id}")
    public ArrayList<TeamDetailsResposeModel> getTeamsForEvaluation(@PathVariable long id) {

    	ArrayList<TeamDetailsResposeModel> listOfTeams = new ArrayList<>();
		
    	ArrayList<TeamDto> teamForevaluation = teamService.getTeamsForEvaluation(id);
     
    	Iterator dtoIterator = teamForevaluation.iterator();
    	
    	while(dtoIterator.hasNext()) {
    		TeamDetailsResposeModel responseModel = new TeamDetailsResposeModel();
    		BeanUtils.copyProperties(dtoIterator.next(), responseModel);
    		listOfTeams.add(responseModel);
    	}
    	
        return listOfTeams;
    }
    
    // get teams by hackathon id
    @PostMapping(path="/amountToPay")
    public TeamMemberAmountToPayWithDisReponseModel amountToPay(@RequestBody teamMemberAmountToPayRequestModel user) {
    	TeamMemberAmountToPayWithDisReponseModel amountDetails = new TeamMemberAmountToPayWithDisReponseModel();
    	
    	amountDetails = teamService.getAmountToPay(user);
    	
    	return amountDetails;
    }

    // update any Team details
    @PutMapping(path="/{id}")
    public TeamDetailsResposeModel updateTeam(@PathVariable long id, @RequestBody TeamDetailsRequestModel teamDetailsRequestModel) {

        // TeamDetailsRequestModel object: contains input request data

        // response model to send data to UI
        TeamDetailsResposeModel returnModel = new TeamDetailsResposeModel();

        // DTO object to hold the input request data
        TeamDto teamDto = new TeamDto();
        
        // transferring input data to DTO object
        ObjectMapper mapper = new ObjectMapper();
        teamDto = mapper.convertValue(teamDetailsRequestModel, TeamDto.class);
        
        // Service method Call to update data
        TeamDto updatedTeam = teamService.updateTeam(id, teamDto);
        
        // Transferring DTO object data to response model
        mapper = new ObjectMapper();
        returnModel = mapper.convertValue(updatedTeam, TeamDetailsResposeModel.class);

        return returnModel;
    }
    
    // submission for any hackathon by particular team
    @PostMapping(path = "/submission/{id}") 
    public String sumbission(@PathVariable long id, @RequestBody SubmissionDetailsRequestModel submission) {
    	
    	teamService.createSubmission(id, submission);
    	 	
    	return "you have submitted git repository link for hackathon";
    }
    
    // payment by any team member for a hackathon
    @PatchMapping(path="/pay/{id}")
    public String paymentForHackathon(@PathVariable long id) {
    	
    	teamService.createPayment(id);
    	
    	return "successfully paid for the hackathon";
    }
    
    // payment by any team member for a hackathon
    @PostMapping(path="/payment")
    public String paymentForHackathon(@RequestBody PaymentRequestModel paymentdetails) {
    	
    	teamService.payment(paymentdetails.getUserEmail(), paymentdetails.getAmount(),paymentdetails.getHackathonName(), paymentdetails.getPaymentTime());
    	
    	return "you have successfully paid for the hackathon";
    }
    
    @PostMapping(path="/getPaymentDetails")
    public HashMap<String, ArrayList<TeamMembersWithPayment>> getPaymentDeatils(@RequestBody PaymentRequestModel paymentdetails) {
    	HashMap<String, ArrayList<TeamMembersWithPayment>> results = new HashMap<String, ArrayList<TeamMembersWithPayment>>();
    	results = teamService.getPaymentDetails(paymentdetails.getHackathonName());
    	return results;
    }
    
    @PostMapping(path="/assignGrade/{id}/{grade}")
    public String assignGrade(@PathVariable long id, @PathVariable double grade) {
    	
    	System.out.println(id + " " + grade);
    	
    	System.out.println(" done .. ");
    	
    	teamService.gradeTeam(id, grade);
        return "Team has been graded";
    }
    
   
    @PostMapping(path="/gradeTeamsWithNames")
    public String assignGrade(@RequestBody GradeTeamsRequestModel gradeTeam) {
    	 teamService.gradeTeamWithName(gradeTeam);
        return "Team for given name and hackathon has been graded";
    }
    
    @RequestMapping(method=RequestMethod.POST, value="/getTeamId",  produces = { "application/json", "application/xml" })
    public JsonObject getMyTeamId(@RequestBody GetTeamIdRequestModel getTeam) {
    	
    	JsonObject oject = teamService.getTeamId(getTeam);
    	
        return oject;
    }
}
