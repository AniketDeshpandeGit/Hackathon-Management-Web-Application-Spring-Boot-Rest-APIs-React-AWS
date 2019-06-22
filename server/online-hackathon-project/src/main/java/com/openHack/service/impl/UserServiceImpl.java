package com.openHack.service.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

import javax.json.Json;
import javax.json.JsonObject;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openHack.SecurityConstants;
import com.openHack.embeddedEntity.Address;
import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;
import com.openHack.io.repository.UserRepository;
import com.openHack.service.UserService;
import com.openHack.shared.dto.OrganizationDto;
import com.openHack.shared.dto.UserDto;
import com.openHack.ui.model.request.UserLoginRequestModel;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository userRepository;
	
	// service method to store user object to database
	public UserDto createUser(UserDto userDto) {
		

		// check for Admin or not -> email ends with @sjsu.edu 
		String email = userDto.getEmail();
		if(email.endsWith("@sjsu.edu"))
			userDto.setAdminCheck(true);
		
		// User with email id already exists or not
		UserEntity existingUserWithEmail = userRepository.findByEmail(userDto.getEmail());
		// if exists then throwing an error
		if(existingUserWithEmail != null)
			throw new RuntimeException("User with email already exists ... ");
		
		// if existing use with same username
		UserEntity existingUserWithUserName = userRepository.findByUserName(userDto.getUserName());
		if(existingUserWithUserName != null)
			throw new RuntimeException("User with same username already exists ... ");
		
		// DTO object to Entity object transfer
		UserEntity userEntity = new UserEntity();
		
		BeanUtils.copyProperties(userDto, userEntity);
		
		// Repository method (save) to save UserEntity object to table users
		UserEntity storedUserDetails = userRepository.save(userEntity);
		
		// returning the saved object to UI
		UserDto returnValue = new UserDto();
		BeanUtils.copyProperties(storedUserDetails, returnValue);
		
		return returnValue;
	}

	
	// Service method to get any user based on it's id(primary key)
	public UserDto getUserById(long id) {
		
		// returning object to UI
		UserDto returnValue = new UserDto();
		
		// Repository method (findById()) to fetch user details
		UserEntity userEntity = userRepository.findById(id);
		
		// Entity object to DTO object transfer
		BeanUtils.copyProperties(userEntity, returnValue);
		
		return returnValue;
	}

	public UserDto updateUser(long id, UserDto userDto) {
		
		// returning object to UI
		UserDto returnValue = new UserDto();
		
		// Repository method (findById()) to fetch user details
		UserEntity userEntity = userRepository.findById(id);
		
		// updating the fields for userEntity
		userEntity.setPortraitUrl(userDto.getPortraitUrl());
		userEntity.setTitle(userDto.getTitle());
		userEntity.setAbout(userDto.getAbout());
			
		userEntity.setStreet(userDto.getStreet());
		userEntity.setCity(userDto.getCity());
		userEntity.setState(userDto.getState());
		userEntity.setZip(userDto.getZip());
		
		// Repository method (save) to save updated UserEntity object to table users
		UserEntity updatedUser = userRepository.save(userEntity);
		
		ObjectMapper mapper = new ObjectMapper();
		returnValue = mapper.convertValue(updatedUser, UserDto.class);
		
		return returnValue;
	}

	// Convenient method to find the user in database while LOGIN
	@Override
	public UserDto getUser(String email) {
		
		UserDto returnValue = new UserDto();
		
		UserEntity userEntity = userRepository.findByEmail(email);
		
		if(userEntity == null)
			throw new RuntimeException(email);
		
		BeanUtils.copyProperties(userEntity, returnValue);
		
		return returnValue;
	}


	@Override
	public JsonObject loginUser(UserLoginRequestModel userLoginRequestModel) {
		
		System.out.println(" The check for signup - " + userLoginRequestModel.toString());
	
		// check for Admin or not -> email ends with @sjsu.edu 
		
		
		// User with email id already exists or not
		UserEntity user = userRepository.findByEmail(userLoginRequestModel.getEmail());
		// if exists then throwing an error
		
		if(user == null)
			throw new RuntimeException("User does not exists ... ");
		
		JsonObject object = null; 
		
		System.out.println(" outside ");
		
		System.out.println(" user password : " + user.getPassword());
				
		if(userLoginRequestModel.getPassword().equals(user.getPassword())) {
			
			System.out.println(" login done .. ");
			
			String token = Jwts.builder()
					.setSubject(user.getEmail())
					.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_DATE))
					.signWith(SignatureAlgorithm.HS512, SecurityConstants.TOKEN_SECRET)
					.compact();
			
			object =Json.createObjectBuilder().add("token", token)
					.add("status", 200)
					.add("id", user.getId())
					.add("email", user.getEmail())
					.add("admin", user.isAdminCheck())
					.add("username", user.getUserName()).build();
			
		
			
			System.out.println("object " + object);
		}
		
		else {
			
			System.out.println(" Not a valid user ... ");
			
			object =Json.createObjectBuilder()
					.add("status", 400).build();
		}
		
		return object;
		
		
	}


	@Override
	public ArrayList<UserDto> getAllUsers() {
		ArrayList<UserEntity> allUsersEntity = new ArrayList<UserEntity>();
		ArrayList<UserDto> allUsersDto = new ArrayList<UserDto>();
		UserDto singleUserDto;
		
		allUsersEntity = userRepository.findAllUsers();
		Iterator iterator = allUsersEntity.iterator(); 
		
		while(iterator.hasNext())
		{
			singleUserDto = new UserDto();
			BeanUtils.copyProperties(iterator.next(), singleUserDto);
			allUsersDto.add(singleUserDto);
		}
		return allUsersDto;
	}

}
