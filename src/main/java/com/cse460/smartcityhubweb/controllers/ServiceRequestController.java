package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.dto.ServiceRequestDTO;
import com.cse460.smartcityhubweb.model.Service;
import com.cse460.smartcityhubweb.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ServiceRequestController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/request-service")
    public ResponseEntity<?> submitServiceRequest(@RequestBody ServiceRequestDTO request) {
        try {
            // Validate required fields
            if (request.getIssueType() == null || request.getIssueType().isEmpty() ||
                request.getTitle() == null || request.getTitle().isEmpty() ||
                request.getDescription() == null || request.getDescription().isEmpty() ||
                request.getLocation() == null || request.getLocation().isEmpty() ||
                request.getZipCode() == null || request.getZipCode().isEmpty()) {

                Map<String, String> error = new HashMap<>();
                error.put("message", "All required fields must be filled");
                return ResponseEntity.badRequest().body(error);
            }

            // Create a new Service entity from the DTO
            Service service = new Service();
            service.setId(UUID.randomUUID().toString());
            service.setIssueType(request.getIssueType());
            service.setTitle(request.getTitle());
            service.setDescription(request.getDescription());
            service.setLocation(request.getLocation());
            service.setZipCode(request.getZipCode());
            service.setFollowUp(request.getFollowUp());
            service.setStatus("Pending"); // New service requests start as pending
            service.setCreatedDate(LocalDate.now());
            service.setPriority(3); // Default priority, can be adjusted later
            // departmentId and assignedWorker will be set later when the service is reviewed

            // Save the service to the repository
            Service savedService = serviceRepository.save(service);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Service request submitted successfully");
            response.put("requestId", savedService.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", "Error submitting service request: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/services")
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
}

