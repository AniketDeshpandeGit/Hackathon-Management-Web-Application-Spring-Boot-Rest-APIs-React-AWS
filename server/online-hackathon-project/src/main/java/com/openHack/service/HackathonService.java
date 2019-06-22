package com.openHack.service;

import java.util.ArrayList;
import java.util.HashMap;
import com.openHack.shared.dto.HackathonDto;
import com.openHack.shared.dto.HackathonResultsDto;
import com.openHack.ui.model.response.EarningReportResponseModel;

public interface HackathonService {
	HackathonDto createHackthon(HackathonDto hackathonDto);
	HackathonDto getHackathonById(long id);
	HackathonDto updateHackathon(long id, HackathonDto hackathonDto);
	ArrayList<HackathonDto> getAllHackathon();
	HackathonDto updateStatus(long id);
	ArrayList<HackathonDto> getMyHackathons(long id);
	ArrayList<HackathonDto> getMyHackathonToJudge(long id);
	HashMap<String, ArrayList<HackathonResultsDto>> finaliseHackathon(HackathonDto hackathonDto);
	ArrayList<String> getFinalisedHackathons();
	EarningReportResponseModel getEarningReport(String hackathonName);
}
