package com.openHack.service;

import java.util.ArrayList;

import javax.json.JsonObject;

import com.openHack.shared.dto.UserDto;
import com.openHack.ui.model.request.UserLoginRequestModel;

public interface UserService {
	public UserDto createUser(UserDto userDto);
	public UserDto getUserById(long id);
	public UserDto getUser(String email);	
	public UserDto updateUser(long id, UserDto userDto);
	public JsonObject loginUser(UserLoginRequestModel userLoginRequestModel);
	public ArrayList<UserDto> getAllUsers();
}
