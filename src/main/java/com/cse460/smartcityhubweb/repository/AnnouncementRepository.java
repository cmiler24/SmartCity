package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, String> {
    
}

