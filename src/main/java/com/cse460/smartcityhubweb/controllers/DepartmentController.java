package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.model.Department;
import com.cse460.smartcityhubweb.repository.DepartmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // TODO: Implement Observer Pattern for department subscriptions
    // - Store subscription relationships between users and departments
    // - Notify subscribed users when department creates events/announcements
    // - Support real-time notifications via WebSocket or SSE

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable String id) {
        return departmentRepository.findById(id).orElse(null);
    }

    // TODO: Implement subscribe endpoint
    // @PostMapping("/subscribe")
    // public Map<String, String> subscribeToDepartment(@RequestBody SubscriptionRequest request) {
    //     // TODO: Add user to department's observers list
    //     // TODO: Persist subscription in database
    //     return Map.of("message", "Successfully subscribed to department");
    // }

    // TODO: Implement unsubscribe endpoint
    // @PostMapping("/unsubscribe")
    // public Map<String, String> unsubscribeFromDepartment(@RequestBody SubscriptionRequest request) {
    //     // TODO: Remove user from department's observers list
    //     // TODO: Update database
    //     return Map.of("message", "Successfully unsubscribed from department");
    // }

    // TODO: Implement get user subscriptions endpoint
    // @GetMapping("/user/{userId}")
    // public List<Department> getUserSubscriptions(@PathVariable String userId) {
    //     // TODO: Return all departments user is subscribed to
    // }

    // TODO: Implement notification endpoint
    // @PostMapping("/{id}/notify")
    // public Map<String, String> notifySubscribers(@PathVariable String id, @RequestBody NotificationRequest notification) {
    //     // TODO: Notify all users subscribed to this department
    //     // TODO: Send real-time notifications via WebSocket or SSE
    // }
}

