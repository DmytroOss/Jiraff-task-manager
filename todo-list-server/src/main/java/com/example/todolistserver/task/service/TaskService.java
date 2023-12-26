package com.example.todolistserver.task.service;

import com.example.todolistserver.generic.service.JpaService;
import org.springframework.stereotype.Service;

import com.example.todolistserver.task.model.Task;
import com.example.todolistserver.task.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService extends JpaService<Task> {
    public TaskService(TaskRepository repository) {
        super(repository);
    }

    public List<Task> findAllByProjectId(Long projectId) {
        return ((TaskRepository) repository).findAllByProjectId(projectId);
    }
}
