package com.cse460.smartcityhubweb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Announcement {
    @Id
    private String id;

    private String type;
    private String department;
    private String title;
    private String description;
    private LocalDate datePosted;

    public Announcement() {
    }

    public Announcement(
            String id,
            String type,
            String department,
            String title,
            String description,
            LocalDate datePosted
    ) {
        this.id = id;
        this.type = type;
        this.department = department;
        this.title = title;
        this.description = description;
        this.datePosted = datePosted;
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getDepartment() {
        return department;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }
}
