package com.openHack.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import javax.json.Json;
import javax.json.JsonObject;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openHack.embeddedEntity.Address;
import com.openHack.io.entity.HackathonEntity;
import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;
import com.openHack.io.repository.OrganizationRepository;
import com.openHack.io.repository.UserRepository;
import com.openHack.service.OrganizationService;
import com.openHack.shared.dto.DenyRequestDto;
import com.openHack.shared.dto.HackathonDto;
import com.openHack.shared.dto.OrganizationDto;

@Service
public class OrganizationServiceImpl implements OrganizationService {

	@Autowired
	OrganizationRepository organizationRepository;
	
	@Autowired
	UserRepository userRepository;
	
	// service method to store organization object to database
	@Override
	public JsonObject createOrganization(OrganizationDto organizationDto) {
		
		// Converting DTO object to Entity object
		OrganizationEntity organizationEntity = new OrganizationEntity();
		
		// Fetch Organization 
		OrganizationEntity existingOrganizationWithSameName = organizationRepository.findByName(organizationDto.getName());
		// To check if organization already exists ... 
		if(existingOrganizationWithSameName != null)
			throw new RuntimeException("Organization with name already exists ... ");
		
		organizationEntity.setName(organizationDto.getName());
		organizationEntity.setDescription(organizationDto.getDescription());
		organizationEntity.setAddress(organizationDto.getAddress());
		
		// If owner has created any organization before
		//OrganizationEntity existingOrganizationWithSameOwnerID = organizationRepository.findByOwnerId(organizationDto.getUserEntity().getId());
		
		// To check if user is associated with any organization
		//if(existingOrganizationWithSameOwnerID != null)
			//throw new RuntimeException("User is owner of any other organization ... ");
		
		// Setting Owner
		
		System.out.println(organizationDto);
		
		System.out.println(" Demo ");
		
		System.out.println(" The owner id: " + organizationDto.getUserEntity());
		
		System.out.println(" demo done ... ");
		
		UserEntity userEntity = userRepository.findById(organizationDto.getUserEntity().getId());
		organizationEntity.setUserEnity(userEntity);
		
		System.out.println(" Before saving : " + organizationEntity);
		
		System.out.println("Good or not ... ");
		
		
		// saving UserEnity, which automatically save OrganizationEnity
		OrganizationEntity savedOrganization = organizationRepository.save(organizationEntity);
		
		JsonObject object = null;
		
		if(savedOrganization != null) {
			object = Json.createObjectBuilder()
					.add("status", 200).build();
		} else {
			object = Json.createObjectBuilder()
					.add("status", 400).build();
		}
		
		
		return object;
	}
	
	// Service method to get any organization based on it's id(primary key)
	@Override
	public OrganizationDto getOrganizationById(long id) {
		
		// returning object to UI
		OrganizationDto returnValue = new OrganizationDto();
		
		// Repository method (findById()) to fetch organization details
		OrganizationEntity organizationEntity = organizationRepository.findById(id);
		
		// Entity object to DTO object transfer
		BeanUtils.copyProperties(organizationEntity, returnValue);
		
		return returnValue;
	}

	@Override
	public OrganizationDto updateOrganization(long id, OrganizationDto organizationDto) {
		
		// returning object to UI
		OrganizationDto returnValue = new OrganizationDto();
		
		// Repository method (findById()) to fetch organization details
		OrganizationEntity organizationEntity = organizationRepository.findById(id);
		
		// updating the fields for organizationEntity
		organizationEntity.setName(organizationEntity.getName());
		organizationEntity.setDescription(organizationDto.getDescription());
		
//		Address updatedAddress = organizationDto.getAddress();
//		organizationEntity.setAddress(updatedAddress);
	
		Address updateAddress = new Address();
		updateAddress.setStreet(organizationDto.getAddress().getStreet());
		updateAddress.setCity(organizationDto.getAddress().getCity());
		updateAddress.setState(organizationDto.getAddress().getState());
		updateAddress.setZip(organizationDto.getAddress().getZip());
		
		organizationEntity.setAddress(updateAddress);
		
		// Repository method (save) to save updated OrganizationEntity object to table organizations
		OrganizationEntity updatedOrganization = organizationRepository.save(organizationEntity);

		ObjectMapper mapper = new ObjectMapper();
		returnValue = mapper.convertValue(updatedOrganization, OrganizationDto.class);
		
		return returnValue;
	}

	@Override
	public ArrayList<OrganizationDto> getAllOrganisations() {
		ArrayList<OrganizationEntity> allOrganisationsEntity = new ArrayList<OrganizationEntity>();
		ArrayList<OrganizationDto> allOrganisationsDto = new ArrayList<OrganizationDto>();
		OrganizationDto singleOrganisationDto;
		
		allOrganisationsEntity = (ArrayList<OrganizationEntity>) organizationRepository.findAll();
		Iterator iterator = allOrganisationsEntity.iterator(); 
		
		while(iterator.hasNext())
		{
			singleOrganisationDto = new OrganizationDto();
			BeanUtils.copyProperties(iterator.next(), singleOrganisationDto);
			allOrganisationsDto.add(singleOrganisationDto);
		}
		return allOrganisationsDto;
	}

	@Override
	public OrganizationDto getMyOrganisations(long id) {
		OrganizationEntity orgEntity;
		// returning object to UI
		OrganizationDto returnValue = new OrganizationDto();
				
		// Repository method (findById()) to fetch organization details
		UserEntity userEntity = userRepository.findById(id);
		
		orgEntity = userEntity.getOrganizationEntity();
		
		BeanUtils.copyProperties(orgEntity, returnValue);
		
		return returnValue;
	}

	// organization accept the join request of user
	@Override
	public void leaveOrganisation(long id) 
	{		
	 //remove entry from organization_join_request table
		organizationRepository.leaveOrg(id);
	}

	@Override
	public ArrayList<OrganizationDto> getCreatedOrganisations(long id) {
		
		ArrayList<OrganizationEntity> allOrganisationsEntity = new ArrayList<OrganizationEntity>();
		ArrayList<OrganizationDto> allOrganisationsDto = new ArrayList<OrganizationDto>();
		OrganizationDto singleOrganisationDto;
		
		allOrganisationsEntity = (ArrayList<OrganizationEntity>) organizationRepository.findByOwnerId(id);
		
		System.out.println(" what is my response : " + allOrganisationsEntity);
		
		Iterator iterator = allOrganisationsEntity.iterator(); 
		
		while(iterator.hasNext())
		{
			singleOrganisationDto = new OrganizationDto();
			BeanUtils.copyProperties(iterator.next(), singleOrganisationDto);
			allOrganisationsDto.add(singleOrganisationDto);
		}
		return allOrganisationsDto;
	}

	@Override
	public OrganizationDto getOrganizationByName(String name) {
		// returning object to UI
		OrganizationDto returnValue = new OrganizationDto();
				
		// Repository method (findById()) to fetch organization details
		OrganizationEntity organizationEntity = organizationRepository.findByName(name);
				
		// Entity object to DTO object transfer
		BeanUtils.copyProperties(organizationEntity, returnValue);
				
		return returnValue;
	}

	@Override
	public HashMap<String, ArrayList<UserEntity>> getOrganisationRequests(long id) {
		HashMap<String, ArrayList<UserEntity>> results = new HashMap<String, ArrayList<UserEntity>>();
		ArrayList<OrganizationEntity> orgs = new ArrayList<OrganizationEntity>();
		ArrayList<UserEntity> users;
		ArrayList<Integer> userIds;  
		
		orgs = organizationRepository.findByOwnerId(id);
		
		for(OrganizationEntity org : orgs)
		{
			userIds = organizationRepository.getUserIds(org.getId());
			users = new ArrayList<UserEntity>();
			for(long userid : userIds)
			{
				users.add(userRepository.findById(userid));
			}
			
			results.put(org.getName(),users);
		}
		return results;
	}
}
