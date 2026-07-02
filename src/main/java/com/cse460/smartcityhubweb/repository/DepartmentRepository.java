package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, String> {

    /**
     * Find a department by its name
     * @param name the department name
     * @return Optional containing the department if found
     */
    Optional<Department> findByName(String name);

    /**
     * Find all departments managed by a specific manager
     * @param managerID the manager's user ID
     * @return List of departments managed by the specified manager
     */
    List<Department> findByManagerID(String managerID);
}
