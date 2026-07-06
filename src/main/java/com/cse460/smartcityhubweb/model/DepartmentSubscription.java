package com.cse460.smartcityhubweb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DepartmentSubscription {

    @Id
    private String id;
    private String departmentId;
    private String userId;

    public DepartmentSubscription() {
    }

    public DepartmentSubscription(String id, String departmentId, String userId) {
        this.id = id;
        this.departmentId = departmentId;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getDepartmentId() {
        return departmentId;
    }
    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
}
