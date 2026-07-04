package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.dto.LoginRequest;
import com.cse460.smartcityhubweb.dto.SignupRequest;
import com.cse460.smartcityhubweb.model.User;
import com.cse460.smartcityhubweb.repository.UserRepository;
import jakarta.persistence.Entity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.*;

//import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // test endpoint to get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/signup")
    public Object signup(@RequestBody SignupRequest request) {

        User user = new User(
                UUID.randomUUID().toString(),
                request.getFirstName(),
                request.getEmail(),
                new ArrayList<String>(java.util.Arrays.asList("Citizen, Guest, CITY_ADMINISTRATOR, City Manager")),
                request.getPassword()
        );

        userRepository.save(user);

        System.out.println("Signup Successful");
        return Map.of("name", user.getName(), "roles", user.getRoles());
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user != null && user.getPassword().equals(request.getPassword())) {
            System.out.println("Login Successful");
            return Map.of( "success", true, "name", user.getName(),
                    "roles", user.getRoles(), "id", user.getId());
        } else {
            System.out.println("Wrong email or password. Please try again");
            return Map.of("success", false);
        }
    }


}