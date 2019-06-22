package com.openHack.ui.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import javax.json.JsonObject;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.openHack.Config_url;
import com.openHack.io.repository.UserRepository;
import com.openHack.service.UserService;
import com.openHack.shared.dto.OrganizationDto;
import com.openHack.shared.dto.UserDto;
import com.openHack.ui.model.request.UserDetailsRequestModel;
import com.openHack.ui.model.request.UserLoginRequestModel;
import com.openHack.ui.model.response.OrganizationDetailsResponseModel;
import com.openHack.ui.model.response.UserDetailsResponseModel;

@CrossOrigin(origins = Config_url.url)
@RequestMapping("users")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping(value = "/login")
	public String login(@RequestBody UserLoginRequestModel userLoginRequestModel) {
		
		JsonObject createUser = userService.loginUser(userLoginRequestModel);
		
		return createUser.toString();
	}
		
	// create and add new user
	@PostMapping
	public UserDetailsResponseModel signUp(@RequestBody UserDetailsRequestModel userDetailsRequestModel) {
		
		// UserDetailsRequestModel object: contains input request data
		
		// response model to send data to UI
		UserDetailsResponseModel returnModel = new UserDetailsResponseModel();
		
		userDetailsRequestModel.setPassword(userDetailsRequestModel.getPassword());
		
		// DTO object to hold the input request data
		UserDto userDto = new UserDto();
		// transferring input data to DTO object
		BeanUtils.copyProperties(userDetailsRequestModel, userDto);
		
		// Service method Call to insert data
		UserDto createUser = userService.createUser(userDto);
		// Transferring DTO object data to response model
		BeanUtils.copyProperties(createUser, returnModel);
		
		return returnModel;
	}
	
	
	// get all the Users for judge
		@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET, produces = { "application/json", "application/xml" })
		public ArrayList<UserDetailsResponseModel> getAllUsersForJudge() 
		{	
			ArrayList<UserDetailsResponseModel> listOfUsers = new ArrayList<UserDetailsResponseModel>();
			
			UserDetailsResponseModel singleResponseModel;
			ArrayList<UserDto> UserDtoList = new ArrayList<UserDto>();
				
			UserDtoList = userService.getAllUsers();
			Iterator dtoIterator = UserDtoList.iterator(); 
				
			while(dtoIterator.hasNext())
			{
				singleResponseModel = new UserDetailsResponseModel();
				BeanUtils.copyProperties(dtoIterator.next(), singleResponseModel);
				listOfUsers.add(singleResponseModel);
			}
			
			System.out.println(listOfUsers);
			System.out.println(" done ... ");
			
			return listOfUsers;
		}
	
	// get any user by id
	@GetMapping(path="/{id}")
	public UserDetailsResponseModel getUser(@PathVariable long id) {
		
		// response model to send data to UI
		UserDetailsResponseModel returnModel = new UserDetailsResponseModel();
		
		// Service method Call to get user data based on id
		UserDto userDetails = userService.getUserById(id);
		// transferring DTO object data to response model
		BeanUtils.copyProperties(userDetails, returnModel);
		
		System.out.println(" The User : " + returnModel);
		
		return returnModel;
	}
	
	// update any user
	@PostMapping(path="/{id}")
	public UserDetailsResponseModel updateUser(@PathVariable long id, @RequestBody UserDetailsRequestModel userDetailsRequestModel) {
		
		System.out.println("id : " + id);
		
		System.out.println(" update user ... ");
		
		// UserDetailsRequestModel object: contains input request data
		
		// response model to send data to UI
		UserDetailsResponseModel returnModel = new UserDetailsResponseModel();
		
		// DTO object to hold the input request data
		UserDto userDto = new UserDto();
		// transferring input data to DTO object
		BeanUtils.copyProperties(userDetailsRequestModel, userDto);
		
		// Service method Call to update data
		UserDto updatedUser = userService.updateUser(id, userDto);
		// Transferring DTO object data to response model
		BeanUtils.copyProperties(updatedUser, returnModel);
		
		return returnModel;
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="users/getUserByEmail",  produces = { "application/json", "application/xml" })
	public UserDetailsResponseModel getUserByEmail(@RequestBody Map<String, Object> payload) 
	{			
		UserDetailsResponseModel returnModel = new UserDetailsResponseModel();
		UserDto userDto = new UserDto();
		userDto = userService.getUser((payload.get("email")).toString());
		BeanUtils.copyProperties(userDto, returnModel);
		return returnModel;
	}
	
	// delete any user
	public String deleteUser() {
		return "delete user was called";
	}
	
}
