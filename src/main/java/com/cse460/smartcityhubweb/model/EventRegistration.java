package com.cse460.smartcityhubweb.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class EventRegistration {
    @Id
    private String id;
    private String eventId;
    private String userId;

//    @ElementCollection
//    private List<String> subscribedUserIds;

    public EventRegistration() {
    }

    public EventRegistration(String id, String eventId, String userId) {
        this.id = id;
        this.eventId = eventId;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
//
//    public void addSubscriber(String subscriberId) {
//        if (!subscribedUserIds.contains(subscriberId)) {
//            subscribedUserIds.add(subscriberId);
//        }
//    }
//
//    public boolean isUserSubscribed(String userId) {
//        return subscribedUserIds.contains(userId);
//    }
}
