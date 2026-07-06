package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.DepartmentSubscription;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentSubscriptionRepository extends JpaRepository<DepartmentSubscription, String> {
    DepartmentSubscription findByDepartmentIdAndUserId(String departmentId, String userId);

    List<DepartmentSubscription> findByUserId(String userId);
}
