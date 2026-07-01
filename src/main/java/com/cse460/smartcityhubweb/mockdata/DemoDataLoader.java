package com.cse460.smartcityhubweb.mockdata;

import com.cse460.smartcityhubweb.model.Event;
import com.cse460.smartcityhubweb.model.User;
import com.cse460.smartcityhubweb.repository.EventRepository;
import com.cse460.smartcityhubweb.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DemoDataLoader {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public DemoDataLoader(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @PostConstruct
    public void loadDemoData() {
        loadDemoUsers();
        loadDemoEvents();
    }

    private void loadDemoUsers() {
        User citizen = new User(
                "user-001",
                "Alex Citizen",
                "citizen@smartcityhub.test",
                java.util.Arrays.asList("CITIZEN"),
                "citizen123"
        );
        citizen.addRole("CITIZEN");

        User guest = new User(
                "user-002",
                "Gina Guest",
                "guest@smartcityhub.test",
                java.util.Arrays.asList("GUEST"),
                "guest123"
        );
        guest.addRole("GUEST");

        User admin = new User(
                "user-003",
                "Adam Administrator",
                "admin@smartcityhub.test",
                java.util.Arrays.asList("CITY_ADMINISTRATOR"),
                "admin123"
        );

        User manager = new User(
                "user-004",
                "Maya Manager",
                "manager@smartcityhub.test",
                java.util.Arrays.asList("DEPARTMENT_MANAGER"),
                "manager123"
        );

        User worker = new User(
                "user-005",
                "Will Worker",
                "worker@smartcityhub.test",
                java.util.Arrays.asList("DEPARTMENT_WORKER"),
                "worker123"
        );

        User[] demoUsers = {
                citizen,
                guest,
                admin,
                manager,
                worker
        };

        userRepository.saveAll(Arrays.asList(demoUsers));
    }

    private void loadDemoEvents() {
        Event[] demoEvents = {
                new Event(
                        "event-001",
                        "Community Food Drive",
                        "Community Service",
                        "Community Center",
                        LocalDate.now().plusDays(3),
                        true,
                        "Volunteer Program",
                        80
                ),

                new Event(
                        "event-002",
                        "Summer Basketball Tournament",
                        "Sports",
                        "City Park",
                        LocalDate.now().plusDays(6),
                        false,
                        "Event",
                        92
                ),

                new Event(
                        "event-003",
                        "Neighborhood Safety Meeting",
                        "Public Safety",
                        "Downtown",
                        LocalDate.now().plusDays(9),
                        true,
                        "Local Initiative",
                        70
                ),

                new Event(
                        "event-004",
                        "Resume and Job Search Workshop",
                        "Education",
                        "City Library",
                        LocalDate.now().plusDays(12),
                        true,
                        "Event",
                        75
                ),

                new Event(
                        "event-005",
                        "Community Park Cleanup",
                        "Environment",
                        "City Park",
                        LocalDate.now().plusDays(15),
                        true,
                        "Volunteer Program",
                        95
                ),

                new Event(
                        "event-006",
                        "Downtown Cultural Festival",
                        "Cultural Activities",
                        "Downtown",
                        LocalDate.now().plusDays(18),
                        true,
                        "Event",
                        88
                )
        };

        eventRepository.saveAll(Arrays.asList(demoEvents));
    }
}