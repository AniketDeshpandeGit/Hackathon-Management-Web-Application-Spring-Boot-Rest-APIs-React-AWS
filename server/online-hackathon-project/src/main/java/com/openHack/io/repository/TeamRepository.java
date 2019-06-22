package com.openHack.io.repository;

import com.openHack.io.entity.TeamEntity;
import com.openHack.io.entity.TeamMemberEntity;
import com.openHack.ui.model.request.TeamDetailsRequestModel;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface TeamRepository extends CrudRepository<TeamEntity, Long>{
	TeamEntity findById(long id);
	
	@Query(value="SELECT * FROM teams t where t.hackathon_id =?1", nativeQuery = true)
	ArrayList<TeamEntity> getTeamsByHackathonId(long id);
	
	@Modifying
	@Transactional
	@Query(value="Update teams set grade=?1 where id =?2", nativeQuery = true)
	void gradeTeam(double grade, long id);
	
	@Modifying
	@Transactional
	@Query(value="Update teams set grade=?1 where team_name like ?2 and hackathon_id=?3", nativeQuery = true)
	void gradeTeam(double grade, String teamName, long hackathonId);
	
	@Query(value="SELECT * FROM teams where hackathon_id =?1 order by grade desc limit 3", nativeQuery = true)
	ArrayList<TeamEntity> getWinnerTeamsByHackathonId(long id);
	
	@Query(value="SELECT * FROM teams where hackathon_id =?1 order by grade desc limit 3, 9518676", nativeQuery = true)
	ArrayList<TeamEntity> getParticipantTeamsByHackathonId(long id);
}
