package com.cse460.smartcityhubweb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Department {
    @Id
    private String id;

    private String name;
    private String managerID;

    public Department() {
    }

    public Department(String id, String name, String managerID) {
        this.id = id;
        this.name = name;
        this.managerID = managerID;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManagerID() {
        return managerID;
    }

    public void setManagerID(String managerID) {
        this.managerID = managerID;
    }
}



