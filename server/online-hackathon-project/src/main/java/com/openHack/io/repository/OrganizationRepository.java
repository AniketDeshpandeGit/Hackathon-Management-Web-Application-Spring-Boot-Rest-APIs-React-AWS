package com.openHack.io.repository;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openHack.io.entity.OrganizationEntity;
import com.openHack.io.entity.UserEntity;

@Repository
@Transactional()
public interface OrganizationRepository extends CrudRepository< OrganizationEntity, Long>{
	OrganizationEntity findById(long id);
	OrganizationEntity findByName(String name);
	
	@Query(value="select * from organizations o where o.owner_id=?1", nativeQuery = true)
	ArrayList<OrganizationEntity> findByOwnerId(long id);
	
	@Query(value="SELECT user_id FROM organization_join_request o where o.organization_id =?1", nativeQuery = true)
	ArrayList<Integer> getUserIds(long id);
	
	@Modifying
	@Transactional
	@Query(value="delete FROM organization_join_request where organization_id =?1 and user_id = ?2", nativeQuery = true)
	void denyRequest(long orgid, long userid);
	
	@Modifying
	@Transactional
	@Query(value="update users set organization_id = NULL where id = ?1", nativeQuery = true)
	void leaveOrg(long userid);
}
