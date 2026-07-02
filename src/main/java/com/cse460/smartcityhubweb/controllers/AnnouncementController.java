package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.model.Announcement;
import com.cse460.smartcityhubweb.repository.AnnouncementRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementController(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
}

