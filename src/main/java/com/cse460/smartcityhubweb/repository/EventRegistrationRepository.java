package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, String> {
	Optional<EventRegistration> findByEventId(String eventId);
    
}
