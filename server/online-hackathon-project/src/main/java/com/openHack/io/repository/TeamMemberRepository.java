package com.openHack.io.repository;

import com.openHack.io.entity.TeamMemberEntity;
import com.openHack.io.entity.UserEntity;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamMemberRepository extends CrudRepository<TeamMemberEntity, Long>
{
	TeamMemberEntity findById(long id);
	@Transactional
	@Modifying
	@Query(value="delete from team_members where team_id = :id", nativeQuery = true)
	void deleteAllById(@Param("id") long id);
	
	@Transactional
	@Query(value="select * from team_members t where t.user_id=?1", nativeQuery = true)
	List<TeamMemberEntity> findByUserId(long id);
	
	@Query(value="Select * from team_members where user_id=?1 and hackathon_id=?2", nativeQuery = true)
	TeamMemberEntity findHackathonByUser(long userId, long hackathonId);
	
	@Query(value="Select team_id from team_members where user_id=?1", nativeQuery = true)
	long getTeamId(long userId);

}
