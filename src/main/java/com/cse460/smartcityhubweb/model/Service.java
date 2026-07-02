package com.cse460.smartcityhubweb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Service {
    @Id
    private String id;

    private String title;
    private String description;
    private String departmentId;
    private String assignedToUserId;
    private String status; // "Pending", "In Progress", "Completed"
    private LocalDate dueDate;
    private LocalDate createdDate;
    private int priority; // 1-5, where 5 is highest

    public Service() {
    }

    public Service(String id, String title, String description, String departmentId,
                String assignedToUserId, String status, LocalDate dueDate,
                LocalDate createdDate, int priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.departmentId = departmentId;
        this.assignedToUserId = assignedToUserId;
        this.status = status;
        this.dueDate = dueDate;
        this.createdDate = createdDate;
        this.priority = priority;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getAssignedToUserId() {
        return assignedToUserId;
    }

    public void setAssignedToUserId(String assignedToUserId) {
        this.assignedToUserId = assignedToUserId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
}

