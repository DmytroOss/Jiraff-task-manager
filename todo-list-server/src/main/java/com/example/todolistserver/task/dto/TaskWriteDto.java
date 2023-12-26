package com.example.todolistserver.task.dto;

import com.example.todolistserver.generic.dto.JpaDto;
import com.example.todolistserver.task.enumerable.TaskPriority;
import com.example.todolistserver.task.enumerable.TaskStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TaskWriteDto extends JpaDto {
    private Long id;
    private Long assigneeId;

    private String title;
    private String description;

    private TaskStatus status;
    private TaskPriority priority;
}
