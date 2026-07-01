package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.dto.SignupRequest;
import com.cse460.smartcityhubweb.model.User;
import com.cse460.smartcityhubweb.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.*;

//import java.util.Map;
import java.util.ArrayList;
import java.util.UUID;

//@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {

        User user = new User(
                UUID.randomUUID().toString(),
                request.getFirstName(),
                request.getEmail(),
                new ArrayList<String>(java.util.Arrays.asList("Citizen")),
                request.getPassword()
        );

        userRepository.save(user);

        return "Account created successfully.";
    }
}