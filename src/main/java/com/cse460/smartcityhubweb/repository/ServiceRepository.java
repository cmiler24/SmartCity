package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, String> {
    List<Service> findByDepartmentID(String departmentId);
    List<Service> findByAssignedWorker(String assignedWorker);
}

