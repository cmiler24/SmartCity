package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.dto.EventRegistrationDTO;
import com.cse460.smartcityhubweb.model.EventRegistration;
import com.cse460.smartcityhubweb.repository.EventRegistrationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/event-registrations")
public class EventRegistrationController {

    private final EventRegistrationRepository eventRegistrationRepository;

    public EventRegistrationController(EventRegistrationRepository eventRegistrationRepository) {
        this.eventRegistrationRepository = eventRegistrationRepository;
    }

    @GetMapping
    public List<EventRegistration> getAllEventRegistrations() {
        return eventRegistrationRepository.findAll();
    }

    @PostMapping("/register")
    public boolean registerEventRegistration(@RequestBody EventRegistrationDTO eventRegistrationDTO) {

        EventRegistration eventRegistration = new EventRegistration(
                UUID.randomUUID().toString(),
                eventRegistrationDTO.getEventId(),
                eventRegistrationDTO.getUserId()
        );

        eventRegistrationRepository.save(eventRegistration);
        return true;
    }
}

