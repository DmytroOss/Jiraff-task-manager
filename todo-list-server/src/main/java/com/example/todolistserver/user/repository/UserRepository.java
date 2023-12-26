package com.example.todolistserver.user.repository;

import com.example.todolistserver.generic.repository.JpaRepository;
import com.example.todolistserver.project.model.Project;
import com.example.todolistserver.user.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findAllByProjectsIn(List<Project> projectList);
}
