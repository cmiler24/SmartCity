package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.model.Service;
import com.cse460.smartcityhubweb.repository.ServiceRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/depmanager")
public class DepartmentManagerController {

    private final ServiceRepository serviceRepository;

    public DepartmentManagerController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    // TODO: Implement service assignment and management endpoints
    // - getServices() - Get services for a department manager's department
    // - createService() - Assign a new service to a worker
    // - updateService() - Update service status or details
    // - completeService() - Mark service as completed
    // - getWorkers() - Get workers in the department

    @PostMapping("/services")
    public Service createService(@RequestBody Map<String, Object> serviceData) {
        Service service = new Service(
                UUID.randomUUID().toString(),
                (String) serviceData.get("title"),
                (String) serviceData.get("description"),
                null, // issueType - null for manager-assigned tasks
                (String) serviceData.getOrDefault("location", ""),
                (String) serviceData.getOrDefault("zipCode", ""),
                false, // followUp - false for manager-assigned tasks
                (String) serviceData.get("departmentId"),
                (String) serviceData.get("assignedWorker"),
                "Pending",
                LocalDate.parse((String) serviceData.get("dueDate")),
                LocalDate.now(),
                ((Number) serviceData.getOrDefault("priority", 3)).intValue()
        );

        return serviceRepository.save(service);
    }

    @PutMapping("/services/{id}")
    public Service updateService(@PathVariable String id, @RequestBody Map<String, Object> serviceData) {
        Service service = serviceRepository.findById(id).orElse(null);
        if (service != null) {
            if (serviceData.containsKey("title")) {
                service.setTitle((String) serviceData.get("title"));
            }
            if (serviceData.containsKey("status")) {
                service.setStatus((String) serviceData.get("status"));
            }
            if (serviceData.containsKey("description")) {
                service.setDescription((String) serviceData.get("description"));
            }
            if (serviceData.containsKey("location")) {
                service.setLocation((String) serviceData.get("location"));
            }
            if (serviceData.containsKey("dueDate")) {
                service.setDueDate(LocalDate.parse((String) serviceData.get("dueDate")));
            }
            if (serviceData.containsKey("priority")) {
                service.setPriority(((Number) serviceData.get("priority")).intValue());
            }
            return serviceRepository.save(service);
        }
        return null;
    }

    @DeleteMapping("/services/{id}")
    public Map<String, String> deleteService(@PathVariable String id) {
        serviceRepository.deleteById(id);
        return Map.of("message", "Service deleted successfully");
    }

    @GetMapping("/get-services/{departmentId}")
    public List<Service> getServicesByDepartment(@PathVariable String departmentId) {
        return serviceRepository.findByDepartmentID(departmentId).stream().toList();
    }


    @GetMapping("/services/worker/{userId}")
    public List<Service> getServicesForWorker(@PathVariable String userId) {
        return serviceRepository.findByAssignedWorker(userId);
    }
}

