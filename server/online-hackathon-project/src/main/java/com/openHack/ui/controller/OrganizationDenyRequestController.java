package com.openHack.ui.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openHack.Config_url;
import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;
import com.openHack.service.DenyRequestService;
import com.openHack.service.JoinRequestService;
import com.openHack.shared.dto.DenyRequestDto;
import com.openHack.shared.dto.JoinRequestDto;
import com.openHack.shared.dto.OrganizationDto;
import com.openHack.shared.dto.UserDto;
import com.openHack.ui.model.request.JoinRequestDetailsModel;
import com.openHack.ui.model.response.OrganizationDetailsResponseModel;
import com.openHack.ui.model.response.UserDetailsResponseModel;

@RestController
@RequestMapping("denyrequest")	// http://localhost:8080/joinrequest
@CrossOrigin(origins = Config_url.url)
public class OrganizationDenyRequestController {	
	@Autowired
	DenyRequestService denyRequestService;
	
	// join request deny by any organization
	@PostMapping("/deny") 
	public String denyJoinRequest(@RequestBody JoinRequestDetailsModel denyJoinRequestDetailsModel) { 
		// JoinRequestDetailsModel object: input request data
		
		DenyRequestDto denyRequestDto = new DenyRequestDto();
		BeanUtils.copyProperties(denyJoinRequestDetailsModel, denyRequestDto);
				
		// Service method Call to accept a request 
		denyRequestService.denyRequest(denyRequestDto);
				
		return "successfully denied request";
	}
}
	