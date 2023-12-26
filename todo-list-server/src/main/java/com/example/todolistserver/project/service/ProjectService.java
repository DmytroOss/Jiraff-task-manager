package com.example.todolistserver.project.service;

import com.example.todolistserver.generic.service.JpaService;
import com.example.todolistserver.user.model.User;
import com.example.todolistserver.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.todolistserver.project.model.Project;
import com.example.todolistserver.project.repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService extends JpaService<Project> {
    private final UserService userService;

    public ProjectService(ProjectRepository repository, UserService userService) {
        super(repository);
        this.userService = userService;
    }

    public Page<Project> findProjectsByCreatorId(Long creatorId, Pageable pageable) {
        return ((ProjectRepository) repository).findAllByCreatorId(creatorId, pageable);
    }

    public Page<Project> findProjectsByCollaborators(List<User> collaborators, Pageable pageable) {
        return ((ProjectRepository) repository).findAllByCollaboratorsIn(collaborators, pageable);
    }

    public Boolean addCollaborator(Long projectId, String email) {
        var user = userService.findEntityByEmail(email);
        var project = this.findOne(projectId);

        var collaborators = project.getCollaborators();
        collaborators.add(user);

        project.setCollaborators(collaborators);

        this.save(project);

        return true;
    }


    public Boolean removeCollaborator(Long projectId, String email) {
        var user = userService.findEntityByEmail(email);
        var project = this.findOne(projectId);

        if (project.getCreator().getId().equals(user.getId())) {
            return false;
        }

        var collaborators = project.getCollaborators();
        collaborators.remove(user);

        project.setCollaborators(collaborators);

        this.save(project);

        return true;
    }
}
