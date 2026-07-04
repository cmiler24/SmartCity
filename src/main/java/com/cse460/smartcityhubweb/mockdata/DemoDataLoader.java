package com.cse460.smartcityhubweb.mockdata;

import com.cse460.smartcityhubweb.model.Announcement;
import com.cse460.smartcityhubweb.model.Department;
import com.cse460.smartcityhubweb.model.Event;
import com.cse460.smartcityhubweb.model.Service;
import com.cse460.smartcityhubweb.model.User;
import com.cse460.smartcityhubweb.repository.AnnouncementRepository;
import com.cse460.smartcityhubweb.repository.DepartmentRepository;
import com.cse460.smartcityhubweb.repository.EventRepository;
import com.cse460.smartcityhubweb.repository.ServiceRepository;
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
    private final AnnouncementRepository announcementRepository;
    private final DepartmentRepository departmentRepository;
    private final ServiceRepository serviceRepository;

    public DemoDataLoader(UserRepository userRepository, EventRepository eventRepository, AnnouncementRepository announcementRepository, DepartmentRepository departmentRepository, ServiceRepository serviceRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.announcementRepository = announcementRepository;
        this.departmentRepository = departmentRepository;
        this.serviceRepository = serviceRepository;
    }

    @PostConstruct
    public void loadDemoData() {
        loadDemoDepartments();
        loadDemoUsers();
        loadDemoEvents();
        loadDemoAnnouncements();
        loadDemoServices();
    }

    private void loadDemoUsers() {
        User citizen = new User(
                "user-001",
                "Alex Citizen",
                "citizen@smartcityhub.test",
                java.util.Arrays.asList("CITIZEN"),
                "citizen123"
        );
        citizen.addRole("CITY_ADMINISTRATOR");
        citizen.addRole("DEPARTMENT_MANAGER");

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
                        "Community Park Cleanup",
                        "Environment",
                        "City Park",
                        LocalDate.of(2026, 7, 3),
                        true,
                        95
                ),

                new Event(
                        "event-002",
                        "Summer Basketball Tournament",
                        "Sports",
                        "Community Center",
                        LocalDate.of(2026, 7, 6),
                        false,
                        88
                ),

                new Event(
                        "event-003",
                        "Resume and Job Search Workshop",
                        "Education",
                        "City Library",
                        LocalDate.of(2026, 7, 10),
                        true,
                        72
                ),

                new Event(
                        "event-004",
                        "Neighborhood Safety Meeting",
                        "Public Safety",
                        "Downtown",
                        LocalDate.of(2026, 7, 13),
                        true,
                        80
                ),

                new Event(
                        "event-005",
                        "Downtown Cultural Festival",
                        "Cultural Activities",
                        "Downtown",
                        LocalDate.of(2026, 7, 18),
                        true,
                        91
                ),

                new Event(
                        "event-006",
                        "Food Drive Volunteer Day",
                        "Community Service",
                        "Community Center",
                        LocalDate.of(2026, 7, 22),
                        true,
                        77
                )
        };

        eventRepository.saveAll(Arrays.asList(demoEvents));
    }

    private void loadDemoAnnouncements() {
        Announcement[] demoAnnouncements = {
                new Announcement(
                        "announcement-001",
                        "Emergency Alert",
                        "Public Safety Department",
                        "Heat Advisory This Weekend",
                        "High temperatures are expected this weekend. Citizens are encouraged to stay hydrated and avoid spending too much time outside.",
                        LocalDate.of(2026, 6, 29)
                ),

                new Announcement(
                        "announcement-002",
                        "Announcement",
                        "Public Works Department",
                        "Road Maintenance on Main Street",
                        "Road work will take place on Main Street from July 1 through July 3. Drivers should expect delays and use alternate routes when possible.",
                        LocalDate.of(2026, 6, 28)
                ),

                new Announcement(
                        "announcement-003",
                        "Announcement",
                        "Parks and Recreation Department",
                        "Community Pool Summer Hours",
                        "The community pool will have extended hours during the month of July. Visit the city events page for the updated schedule.",
                        LocalDate.of(2026, 6, 27)
                ),

                new Announcement(
                        "announcement-004",
                        "Emergency Alert",
                        "Public Safety Department",
                        "Severe Weather Warning",
                        "Severe thunderstorms are expected this afternoon. Residents should seek shelter and avoid outdoor activities until the warning is lifted.",
                        LocalDate.of(2026, 7, 1)
                ),

                new Announcement(
                        "announcement-005",
                        "Announcement",
                        "City Planning Department",
                        "New Community Center Grand Opening",
                        "Join us for the grand opening of the new downtown community center. Free activities and refreshments will be available for all family members.",
                        LocalDate.of(2026, 6, 26)
                )
        };

        announcementRepository.saveAll(Arrays.asList(demoAnnouncements));
    }

    private void loadDemoServices() {
        // TODO: Add more comprehensive demo services for various departments
        Service[] demoServices = {
                new Service(
                        "service-001",
                        "Clean Park Benches",
                        "Clean and repair all benches in Central Park",
                        "dept-001",
                        "user-005",
                        "In Progress",
                        LocalDate.of(2026, 7, 15),
                        LocalDate.of(2026, 7, 5),
                        4
                ),
                new Service(
                        "service-002",
                        "Repair Pothole on Main St",
                        "Fill and repair pothole at Main and 3rd Street",
                        "dept-003",
                        "user-005",
                        "Pending",
                        LocalDate.of(2026, 7, 10),
                        LocalDate.of(2026, 7, 5),
                        5
                ),
                new Service(
                        "service-003",
                        "Conduct Safety Awareness",
                        "Hold monthly safety awareness meeting for residents",
                        "dept-002",
                        "user-005",
                        "Completed",
                        LocalDate.of(2026, 7, 8),
                        LocalDate.of(2026, 6, 25),
                        3
                )
        };

        serviceRepository.saveAll(Arrays.asList(demoServices));
    }

    private void loadDemoDepartments() {
        Department[] demoDepartments = {
                new Department("dept-001", "Parks and Recreation", "user-004"),
                new Department("dept-002", "Public Safety Department", "user-004"),
                new Department("dept-003", "Public Works Department", "user-004"),
                new Department("dept-004", "City Planning Department", "user-004"),
                new Department("dept-005", "Education and Community Service", "user-004")
        };

        departmentRepository.saveAll(Arrays.asList(demoDepartments));
    }
}