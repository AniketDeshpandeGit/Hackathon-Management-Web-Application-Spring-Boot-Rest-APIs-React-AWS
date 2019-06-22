package com.openHack.service;

import java.util.ArrayList;
import java.util.HashMap;

import javax.json.JsonObject;

import com.openHack.io.entity.UserEntity;
import com.openHack.shared.dto.OrganizationDto;

public interface OrganizationService {
	JsonObject createOrganization(OrganizationDto organizationDto);
	OrganizationDto getOrganizationById(long id);
	OrganizationDto getOrganizationByName(String name);
	OrganizationDto updateOrganization(long id, OrganizationDto organizationDto);
	ArrayList<OrganizationDto> getAllOrganisations();
	OrganizationDto getMyOrganisations(long id);
	void leaveOrganisation(long id);
	ArrayList<OrganizationDto> getCreatedOrganisations(long id);
	HashMap<String, ArrayList<UserEntity>> getOrganisationRequests(long id);
}
