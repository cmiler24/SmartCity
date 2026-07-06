package com.cse460.smartcityhubweb.controllers;

import com.cse460.smartcityhubweb.dto.DepartmentSubscriptionDTO;
import com.cse460.smartcityhubweb.model.DepartmentSubscription;
import com.cse460.smartcityhubweb.repository.DepartmentSubscriptionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/department-subscriptions")
public class DepartmentSubscriptionController {

    private final DepartmentSubscriptionRepository departmentSubscriptionRepository;

    public DepartmentSubscriptionController(DepartmentSubscriptionRepository departmentSubscriptionRepository) {
        this.departmentSubscriptionRepository = departmentSubscriptionRepository;
    }

    @GetMapping()
    public List<DepartmentSubscription> getDepartmentSubscriptions() {
        return departmentSubscriptionRepository.findAll();
    }

    @GetMapping("/{userId}")
    public List<DepartmentSubscription> getDepartmentSubscriptionsByUserId(@PathVariable String userId) {
        return departmentSubscriptionRepository.findByUserId(userId);
    }

    @PostMapping("/subscribe")
    public boolean subscribeToDept(@RequestBody DepartmentSubscriptionDTO departmentSubscriptionDTO) {
        DepartmentSubscription departmentSubscription = new DepartmentSubscription(
                UUID.randomUUID().toString(),
                departmentSubscriptionDTO.getDepartmentId(),
                departmentSubscriptionDTO.getUserId()
        );

        departmentSubscriptionRepository.save(departmentSubscription);
        return true;
    }

    @DeleteMapping("/unsubscribe")
    public boolean unsubscribeFromDept(@RequestBody DepartmentSubscriptionDTO departmentSubscriptionDTO) {
        DepartmentSubscription departmentSubscription = departmentSubscriptionRepository.findByDepartmentIdAndUserId(
                departmentSubscriptionDTO.getDepartmentId(),
                departmentSubscriptionDTO.getUserId()
        );

        if (departmentSubscription != null) {
            departmentSubscriptionRepository.delete(departmentSubscription);
            return true;
        }

        return false;
    }
}
