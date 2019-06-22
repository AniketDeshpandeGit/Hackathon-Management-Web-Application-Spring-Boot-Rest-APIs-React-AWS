package com.openHack.io.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openHack.io.entity.TeamMembersTeam;

@Repository
public interface TeamMembersTeamRepository extends CrudRepository<TeamMembersTeam, Long>
{
	@Query(value="select * from team_members_team u where u.member_id=?1", nativeQuery = true)
	TeamMembersTeam findMemberId(long id);

}
