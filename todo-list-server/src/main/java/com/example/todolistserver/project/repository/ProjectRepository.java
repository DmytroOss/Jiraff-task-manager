package com.example.todolistserver.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.todolistserver.user.model.User;

import com.example.todolistserver.project.model.Project;
import com.example.todolistserver.generic.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project> {
    Page<Project> findAllByCreatorId(Long creatorId, Pageable pageable);
    Page<Project> findAllByCollaboratorsIn(List<User> collaborators, Pageable pageable);
}
