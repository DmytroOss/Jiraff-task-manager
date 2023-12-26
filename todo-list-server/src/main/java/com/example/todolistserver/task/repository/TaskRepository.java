package com.example.todolistserver.task.repository;

import com.example.todolistserver.task.model.Task;
import com.example.todolistserver.generic.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task> {
    List<Task> findAllByProjectId(Long projectId);
}
