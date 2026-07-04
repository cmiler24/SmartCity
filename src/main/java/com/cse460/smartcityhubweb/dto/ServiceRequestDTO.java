package com.cse460.smartcityhubweb.dto;

public class ServiceRequestDTO {
    private String issueType;
    private String title;
    private String description;
    private String location;
    private String zipCode;
    private Boolean followUp;
    private String submittedAt;

    public ServiceRequestDTO() {
    }

    public ServiceRequestDTO(String issueType, String title, String description,
                            String location, String zipCode, Boolean followUp, String submittedAt) {
        this.issueType = issueType;
        this.title = title;
        this.description = description;
        this.location = location;
        this.zipCode = zipCode;
        this.followUp = followUp;
        this.submittedAt = submittedAt;
    }

    // Getters and Setters
    public String getIssueType() { return issueType; }
    public void setIssueType(String issueType) { this.issueType = issueType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public Boolean getFollowUp() { return followUp; }
    public void setFollowUp(Boolean followUp) { this.followUp = followUp; }

    public String getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }
}

