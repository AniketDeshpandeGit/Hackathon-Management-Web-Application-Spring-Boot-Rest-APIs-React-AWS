package com.openHack.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Column;

import org.hibernate.annotations.Where;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;
import com.openHack.io.repository.OrganizationRepository;
import com.openHack.io.repository.UserRepository;
import com.openHack.service.DenyRequestService;
import com.openHack.service.JoinRequestService;
import com.openHack.shared.dto.DenyRequestDto;
import com.openHack.shared.dto.HackathonDto;
import com.openHack.shared.dto.JoinRequestDto;
import com.openHack.shared.dto.UserDto;

@Service
public class DenyRequestServiceImpl implements DenyRequestService{

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	OrganizationRepository organizationRepository;

	// organization accept the join request of user
	@Override
	public void denyRequest(DenyRequestDto denyRequestDto) {
		
		//remove entry from organization_join_request table
		
		// Fetch organization details
		organizationRepository.denyRequest(denyRequestDto.getOrganization_id(), denyRequestDto.getUser_id());
	}
}
