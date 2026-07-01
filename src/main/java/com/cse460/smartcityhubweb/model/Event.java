package com.cse460.smartcityhubweb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
//@Table(name = "events")
public class Event {

    @Id
    private String id;

    private String title;
    private String category;
    private String location;
    private LocalDate eventDate;
    private boolean free;
    private String eventType;
    private int popularity;

    public Event() {
    }

    public Event(
            String id,
            String title,
            String category,
            String location,
            LocalDate eventDate,
            boolean free,
            String eventType,
            int popularity
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.location = location;
        this.eventDate = eventDate;
        this.free = free;
        this.eventType = eventType;
        this.popularity = popularity;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getLocation() {
        return location;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public boolean isFree() {
        return free;
    }

    public String getEventType() {
        return eventType;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public void setFree(boolean free) {
        this.free = free;
    }

    public void setProgramType(String eventType) {
        this.eventType = eventType;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }
}
