package com.example.todolistserver.task.dto;

import com.example.todolistserver.generic.dto.JpaDto;
import com.example.todolistserver.task.enumerable.TaskPriority;
import com.example.todolistserver.task.enumerable.TaskStatus;
import com.example.todolistserver.user.dto.UserReadDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TaskReadDto extends JpaDto {
    private String title;
    private String description;

    private String updatedBy;
    private UserReadDto assignee;

    private TaskStatus status;
    private TaskPriority priority;
}
