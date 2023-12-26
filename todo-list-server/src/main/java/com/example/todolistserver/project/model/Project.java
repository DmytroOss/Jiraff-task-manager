package com.example.todolistserver.project.model;

import com.example.todolistserver.task.model.Task;
import com.example.todolistserver.user.model.User;
import com.example.todolistserver.generic.model.JpaEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Project extends JpaEntity {
    private String name;
    private String description;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "creator_id")
    private User creator;

    @JoinTable(
            name = "project_collaborators",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "collaborator_id")
    )
    @ManyToMany(cascade = CascadeType.PERSIST)
    private Set<User> collaborators;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private List<Task> tasks;
}
