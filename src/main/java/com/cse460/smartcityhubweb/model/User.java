package com.cse460.smartcityhubweb.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String passwordHash;

//    @ElementCollection
    private List<String> roles;

    // Constructors
    public User() {
    }

    public User(String id, String name, String email, List<String> roles, String passwordHash) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = new ArrayList<>(roles);
        this.passwordHash = passwordHash;
    }

    // Getters and Setters
//    public UUID getId() {
//        return id;
//    }
//
//    public void setId(UUID id) {
//        this.id = id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void addRole(String role) {
        roles.add(role);
    }

    public void setRoles(List<String> roles) {
        this.roles = new ArrayList<>(roles);
    }

    public void setPassword(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}
