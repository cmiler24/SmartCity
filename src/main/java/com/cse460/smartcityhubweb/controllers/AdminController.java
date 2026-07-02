package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.model.Announcement;
import com.cse460.smartcityhubweb.model.Event;
import com.cse460.smartcityhubweb.repository.AnnouncementRepository;
import com.cse460.smartcityhubweb.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final EventRepository eventRepository;
    private final AnnouncementRepository announcementRepository;

    public AdminController(EventRepository eventRepository, AnnouncementRepository announcementRepository) {
        this.eventRepository = eventRepository;
        this.announcementRepository = announcementRepository;
    }

    // Event endpoints
    @PostMapping("/events")
    public Event createEvent(@RequestBody Map<String, Object> eventData) {
        Event event = new Event(
                UUID.randomUUID().toString(),
                (String) eventData.get("title"),
                (String) eventData.get("eventType"),
                (String) eventData.get("location"),
                LocalDate.parse((String) eventData.get("eventDate")),
                (Boolean) eventData.get("free"),
                ((Number) eventData.getOrDefault("popularity", 0)).intValue()
        );

        return eventRepository.save(event);
    }

    @DeleteMapping("/events/{id}")
    public Map<String, String> deleteEvent(@PathVariable String id) {
        eventRepository.deleteById(id);
        return Map.of("message", "Event deleted successfully");
    }

    @PutMapping("/events/{id}")
    public Event updateEvent(@PathVariable String id, @RequestBody Map<String, Object> eventData) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event != null) {
            event.setTitle((String) eventData.get("title"));
            event.setEventType((String) eventData.get("eventType"));
            event.setLocation((String) eventData.get("location"));
            event.setEventDate(LocalDate.parse((String) eventData.get("eventDate")));
            event.setFree((Boolean) eventData.get("free"));
            event.setPopularity(((Number) eventData.getOrDefault("popularity", event.getPopularity())).intValue());
            return eventRepository.save(event);
        }
        return null;
    }

    // Announcement endpoints
    @PostMapping("/announcements")
    public Announcement createAnnouncement(@RequestBody Map<String, Object> announcementData) {
        Announcement announcement = new Announcement(
                UUID.randomUUID().toString(),
                (String) announcementData.get("type"),
                (String) announcementData.get("department"),
                (String) announcementData.get("title"),
                (String) announcementData.get("description"),
                LocalDate.now()
        );

        return announcementRepository.save(announcement);
    }

    @DeleteMapping("/announcements/{id}")
    public Map<String, String> deleteAnnouncement(@PathVariable String id) {
        announcementRepository.deleteById(id);
        return Map.of("message", "Announcement deleted successfully");
    }

    @PutMapping("/announcements/{id}")
    public Announcement updateAnnouncement(@PathVariable String id, @RequestBody Map<String, Object> announcementData) {
        Announcement announcement = announcementRepository.findById(id).orElse(null);
        if (announcement != null) {
            announcement.setType((String) announcementData.get("type"));
            announcement.setDepartment((String) announcementData.get("department"));
            announcement.setTitle((String) announcementData.get("title"));
            announcement.setDescription((String) announcementData.get("description"));
            return announcementRepository.save(announcement);
        }
        return null;
    }
}

