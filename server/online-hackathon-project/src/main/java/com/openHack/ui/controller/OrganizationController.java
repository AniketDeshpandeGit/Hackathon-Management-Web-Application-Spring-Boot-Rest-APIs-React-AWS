package com.openHack.ui.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.json.JsonObject;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.openHack.Config_url;
import com.openHack.io.entity.UserEntity;
import com.openHack.service.OrganizationService;
import com.openHack.shared.dto.DenyRequestDto;
import com.openHack.shared.dto.HackathonDto;
import com.openHack.shared.dto.OrganizationDto;
import com.openHack.shared.dto.UserDto;
import com.openHack.ui.model.request.JoinRequestDetailsModel;
import com.openHack.ui.model.request.OrganizationDetailsRequestModel;
import com.openHack.ui.model.response.HackathonDetailsResposeModel;
import com.openHack.ui.model.response.OrganizationDetailsResponseModel;

@RestController
@RequestMapping("organizations") // http://localhost:8080/organizations
@CrossOrigin(origins = Config_url.url)
public class OrganizationController {

	@Autowired
	OrganizationService organizationService;

	// create and add new organization
	@PostMapping
	public JsonObject createOrganization(@RequestBody OrganizationDetailsRequestModel organizationRequestModel) {

		// OrganizationRequestModel object: contains input request data

		System.out.println(" input Request model : " + organizationRequestModel);

		// DTO object to hold the input request data
		OrganizationDto organizationDto = new OrganizationDto();

		// transferring input data to DTO object
		organizationDto.setName(organizationRequestModel.getName());
		organizationDto.setDescription(organizationRequestModel.getDescription());
		organizationDto.setAddress(organizationRequestModel.getAddress());
		UserEntity userEntity = new UserEntity();
		userEntity.setId(organizationRequestModel.getOwnerId());
		organizationDto.setUserEntity(userEntity);

		BeanUtils.copyProperties(organizationRequestModel, organizationDto);

		// Service method Call to insert data
		JsonObject object = organizationService.createOrganization(organizationDto);

		return object;
	}

	// get any organization by id
	@GetMapping(path = "/{id}")
	public OrganizationDetailsResponseModel getOrganization(@PathVariable long id) {

		// response model to send data to UI
		OrganizationDetailsResponseModel returnModel = new OrganizationDetailsResponseModel();

		// Service method Call to get organization data based on id
		OrganizationDto organizationDetails = organizationService.getOrganizationById(id);
		// transferring DTO object data to response model
		BeanUtils.copyProperties(organizationDetails, returnModel);

		return returnModel;
	}

	// get any organization by name
	@GetMapping(path = "/name/{orgName}")
	public OrganizationDetailsResponseModel getOrganizationByName(@PathVariable String orgName)
			throws UnsupportedEncodingException {

		String decoded = URLDecoder.decode(orgName, "UTF-8");

		// response model to send data to UI
		OrganizationDetailsResponseModel returnModel = new OrganizationDetailsResponseModel();

		// Service method Call to get organization data based on id
		OrganizationDto organizationDetails = organizationService.getOrganizationByName(decoded);
		// transferring DTO object data to response model
		BeanUtils.copyProperties(organizationDetails, returnModel);

		return returnModel;
	}

	// update any organization
	@PutMapping(path = "/{id}")
	public OrganizationDetailsResponseModel updateOrganization(@PathVariable long id,
			@RequestBody OrganizationDetailsRequestModel organizationRequestModel) {

		// OrganizationRequestModel object: contains input request data

		// response model to send data to UI
		OrganizationDetailsResponseModel returnModel = new OrganizationDetailsResponseModel();

		// DTO object to hold the input request data
		OrganizationDto organizationDto = new OrganizationDto();
		// transferring input data to DTO object
		BeanUtils.copyProperties(organizationRequestModel, organizationDto);

		// Service method Call to update data
		OrganizationDto updatedOrganization = organizationService.updateOrganization(id, organizationDto);
		// Transferring DTO object data to response model
		BeanUtils.copyProperties(updatedOrganization, returnModel);

		return returnModel;
	}

	// get all the organizations
	@RequestMapping(value = "/getAllOrganistions", method = RequestMethod.GET, produces = { "application/json",
			"application/xml" })
	public ArrayList<OrganizationDetailsResponseModel> getAllOrganisations() {
		ArrayList<OrganizationDetailsResponseModel> listOfOrganisations = new ArrayList<OrganizationDetailsResponseModel>();
		OrganizationDetailsResponseModel singleResponseModel;
		ArrayList<OrganizationDto> OrganizationDtoList = new ArrayList<OrganizationDto>();

		OrganizationDtoList = organizationService.getAllOrganisations();
		Iterator dtoIterator = OrganizationDtoList.iterator();

		while (dtoIterator.hasNext()) {
			singleResponseModel = new OrganizationDetailsResponseModel();
			BeanUtils.copyProperties(dtoIterator.next(), singleResponseModel);
			listOfOrganisations.add(singleResponseModel);
		}
		return listOfOrganisations;
	}

	// get all the created organizations by user
	@RequestMapping(value = "/getCreatedOrganizations/{id}", method = RequestMethod.GET, produces = {
			"application/json", "application/xml" })
	public ArrayList<OrganizationDetailsResponseModel> getAllCreatedOrganisations(@PathVariable long id) {

		System.out.println(" Hit done ... ");
		ArrayList<OrganizationDetailsResponseModel> listOfOrganisations = new ArrayList<OrganizationDetailsResponseModel>();
		OrganizationDetailsResponseModel singleResponseModel;
		ArrayList<OrganizationDto> OrganizationDtoList = new ArrayList<OrganizationDto>();

		OrganizationDtoList = organizationService.getCreatedOrganisations(id);
		Iterator dtoIterator = OrganizationDtoList.iterator();

		while (dtoIterator.hasNext()) {
			singleResponseModel = new OrganizationDetailsResponseModel();
			BeanUtils.copyProperties(dtoIterator.next(), singleResponseModel);
			listOfOrganisations.add(singleResponseModel);
		}

		System.out.println(" the result " + listOfOrganisations);
		return listOfOrganisations;
	}

	// get the organization that user is a part of
	@RequestMapping(path = "/getMyOrganisation/{id}", method = RequestMethod.GET, produces = { "application/json",
			"application/xml" })
	public OrganizationDetailsResponseModel getMyOrganistions(@PathVariable long id) {
		OrganizationDetailsResponseModel myOrg = new OrganizationDetailsResponseModel();
		OrganizationDto myOrgDto = new OrganizationDto();

		myOrgDto = organizationService.getMyOrganisations(id);
		BeanUtils.copyProperties(myOrgDto, myOrg);
		return myOrg;
	}

	// leave a organization
	@RequestMapping(path = "/leaveOrganisation/{id}", method = RequestMethod.POST, produces = { "application/json",
			"application/xml" })
	public String leaveOrganistions(@PathVariable long id) {
		organizationService.leaveOrganisation(id);
		return "successfully left organisation";
	}

	// get all the users that sent request to organisation that this user is a owner
	// of
	@GetMapping(path = "/getOrganisationRequests/{id}")
	public HashMap<String, ArrayList<UserDto>> getOrganisationRequests(@PathVariable long id) {
		HashMap<String, ArrayList<UserEntity>> retrunedResults;
		HashMap<String, ArrayList<UserDto>> results = new HashMap<String, ArrayList<UserDto>>();
		ArrayList<UserDto> userDtos;
		retrunedResults = organizationService.getOrganisationRequests(id);

		for (Map.Entry<String, ArrayList<UserEntity>> entry : retrunedResults.entrySet()) {
			String key = entry.getKey();
			ArrayList<UserEntity> value = (ArrayList<UserEntity>) entry.getValue();
			userDtos = new ArrayList<UserDto>();
			UserDto userDto;
			for (UserEntity user : value) {
				userDto = new UserDto();
				BeanUtils.copyProperties(user, userDto);
				userDtos.add(userDto);
			}
			results.put(key, userDtos);
		}
		return results;
	}
}
