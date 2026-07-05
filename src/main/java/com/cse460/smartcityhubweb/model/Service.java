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
    private String issueType; // Type of service request (pothole, graffiti, etc.)
    private String location;
    private String zipCode;
    private Boolean followUp;
    private String departmentID;
    private String assignedWorker;
    private String status; // "Pending", "In Progress", "Completed"
    private LocalDate dueDate;
    private LocalDate createdDate;
    private int priority; // 1-5, where 5 is highest

    public Service() {
    }

    public Service(String id, String title, String description, String issueType,
                String location, String zipCode, Boolean followUp, String departmentID,
                String assignedWorker, String status, LocalDate dueDate,
                LocalDate createdDate, int priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.issueType = issueType;
        this.location = location;
        this.zipCode = zipCode;
        this.followUp = followUp;
        this.departmentID = departmentID;
        this.assignedWorker = assignedWorker;
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

    public String getIssueType() {
        return issueType;
    }

    public void setIssueType(String issueType) {
        this.issueType = issueType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Boolean getFollowUp() {
        return followUp;
    }

    public void setFollowUp(Boolean followUp) {
        this.followUp = followUp;
    }

    public String getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(String departmentID) {
        this.departmentID = departmentID;
    }

    public String getAssignedWorker() {
        return assignedWorker;
    }

    public void setAssignedWorker(String assignedWorker) {
        this.assignedWorker = assignedWorker;
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

