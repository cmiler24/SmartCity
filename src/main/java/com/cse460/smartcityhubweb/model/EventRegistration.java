package com.cse460.smartcityhubweb.model;

import java.util.List;

public class EventRegistration {
    String id;
    String eventId;
    List<String> subscribedUserIds;

    public EventRegistration(String id, String eventId, List<String> subscribedUserIds) {
        this.id = id;
        this.eventId = eventId;
        this.subscribedUserIds = subscribedUserIds;
    }
}
