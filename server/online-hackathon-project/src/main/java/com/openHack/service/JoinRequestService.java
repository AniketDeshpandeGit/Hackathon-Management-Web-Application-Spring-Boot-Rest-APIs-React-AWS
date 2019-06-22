package com.openHack.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;
import com.openHack.shared.dto.JoinRequestDto;
import com.openHack.shared.dto.UserDto;

public interface JoinRequestService {
	void createRequest(JoinRequestDto joinRequestDto);
	void acceptRequest(JoinRequestDto joinRequestDto);
	List<OrganizationEntity> getOrganizations(long id);
	HashMap<String,ArrayList<UserDto>> getUsers(long id);
}
