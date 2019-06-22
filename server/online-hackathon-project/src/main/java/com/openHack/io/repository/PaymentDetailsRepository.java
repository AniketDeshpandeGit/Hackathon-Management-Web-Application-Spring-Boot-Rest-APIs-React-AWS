package com.openHack.io.repository;

import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.openHack.io.entity.PaymentDetailsEntity;

@Repository
public interface PaymentDetailsRepository extends CrudRepository<PaymentDetailsEntity, Long>{
	PaymentDetailsEntity findById(long id);
	
	@Query(value="SELECT * FROM payments where hackathon_name like ?1", nativeQuery = true)
	ArrayList<PaymentDetailsEntity> getHackathonPayments(String hackathonName);
	
	@Query(value="SELECT SUM(amount_paid) total from openhack.payments where hackathon_name like ?1", nativeQuery = true)
	double getRevnueFromPaidRegistration(String hackathonName);
	
	//@Query(value = "SELECT SUM(total_days) FROM MyEntity", nativeQuery = true)
	
	@Query(value="select count(*) from openhack.payments where amount_paid = 0 and hackathon_name like ?1", nativeQuery = true)
	int getNumberOfNonPaidUsers(String hackathonName);
}
