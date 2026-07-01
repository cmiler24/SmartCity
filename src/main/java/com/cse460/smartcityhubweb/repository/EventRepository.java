package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {

}
