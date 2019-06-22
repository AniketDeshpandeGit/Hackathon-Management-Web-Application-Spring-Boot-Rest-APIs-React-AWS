package com.openHack.service;

import java.util.ArrayList;
import java.util.List;

import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;
import com.openHack.shared.dto.DenyRequestDto;
import com.openHack.shared.dto.JoinRequestDto;
import com.openHack.shared.dto.UserDto;

public interface DenyRequestService {
	void denyRequest(DenyRequestDto denyRequestDto);
}
