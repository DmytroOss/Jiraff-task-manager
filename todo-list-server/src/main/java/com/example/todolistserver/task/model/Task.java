package com.example.todolistserver.task.model;

import com.example.todolistserver.project.model.Project;
import com.example.todolistserver.task.enumerable.TaskPriority;
import com.example.todolistserver.task.enumerable.TaskStatus;
import com.example.todolistserver.user.model.User;
import com.example.todolistserver.generic.model.JpaEntity;
import lombok.*;
import jakarta.persistence.*;
import org.springframework.data.annotation.LastModifiedBy;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Task extends JpaEntity {
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @LastModifiedBy
    private String updatedBy;
}
