package com.cse460.smartcityhubweb.repository;

import com.cse460.smartcityhubweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String>{

    boolean existsByEmail(String email);
}
