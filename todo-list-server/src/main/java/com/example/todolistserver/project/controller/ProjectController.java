package com.example.todolistserver.project.controller;

import com.example.todolistserver.project.dto.AddCollaboratorRequest;
import com.example.todolistserver.user.dto.UserReadDto;
import com.example.todolistserver.user.mapper.UserMapper;
import com.example.todolistserver.user.service.UserService;
import lombok.RequiredArgsConstructor;

import com.example.todolistserver.generic.util.UserContext;
import com.example.todolistserver.generic.util.ServerResponse;
import com.example.todolistserver.generic.util.ServerResponseRunner;

import com.example.todolistserver.project.dto.ProjectReadDto;
import com.example.todolistserver.project.dto.ProjectWriteDto;
import com.example.todolistserver.project.mapper.ProjectMapper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.example.todolistserver.project.service.ProjectService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final UserMapper userMapper;
    private final UserService userService;
    private final ProjectMapper projectMapper;
    private final ProjectService projectService;


    @GetMapping("/{id}")
    public ServerResponse<ProjectReadDto> findOne(@PathVariable Long id) {
        return ServerResponseRunner.safeRun((projectId -> {
            return projectMapper.toReadDto(projectService.findOne(projectId));
        }), id);
    }

    @GetMapping("/{id}/collaborators")
    public ServerResponse<List<UserReadDto>> findProjectCollaborators(@PathVariable Long id) {
        var project = projectService.findOne(id);
        return ServerResponseRunner.safeRun((projects -> {
            var users = userService.findProjectCollaborators(projects);
            return users.stream()
                    .map(user -> {
                        var userReadDto = userMapper.toReadDto(user);
                        userReadDto.setId(user.getId());
                        return userReadDto;
                    }
            ).toList();
        }), List.of(project));
    }

    @GetMapping("/my")
    public ServerResponse<Page<ProjectReadDto>> findMyCreatedProjects(Pageable pageable) {
        var user = userService.findOne(UserContext.getCurrentUser().getId());
        return ServerResponseRunner.safeRun((creator -> {
            var projects = projectService
                    .findProjectsByCreatorId(creator.getId(), pageable);
            return projects.map(project -> {
                var projectReadDto = projectMapper.toReadDto(project);
                projectReadDto.setCanEdit(true);

                return projectReadDto;
            });
        }), user);
    }

    @GetMapping("/my/collaborative")
    public ServerResponse<Page<ProjectReadDto>> findUserCollaborationProjects(Pageable pageable) {
        var user = userService.findOne(UserContext.getCurrentUser().getId());
        return ServerResponseRunner.safeRun((collaborators -> {
            var projects = projectService
                    .findProjectsByCollaborators(collaborators, pageable);

            return projects.map(project -> {
                var projectReadDto = projectMapper.toReadDto(project);
                projectReadDto.setCanEdit(project.getCreator().getId().equals(user.getId()));

                return projectReadDto;
            });
        }), List.of(user));
    }

    @PostMapping("")
    public ServerResponse<ProjectReadDto> save(@RequestBody ProjectWriteDto writeDto) {
        return ServerResponseRunner.safeRun((projectWriteDto -> {
            var currentUser = UserContext.getCurrentUser();
            var project = projectMapper.fromWriteDto(projectWriteDto);

            var projectId = projectWriteDto.getId();
            if (projectId != null && !projectService.findOne(projectId).getCreator().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Access Denied");
            }

            var user = userService.findOne(currentUser.getId());

            project.setCreator(user);
            project.setCollaborators(Set.of(user));

            var projectReadDto = projectMapper.toReadDto(projectService.save(project));
            projectReadDto.setCanEdit(true);

            return projectReadDto;
        }), writeDto);
    }

    @PostMapping("/{id}/collaborators/add")
    public ServerResponse<Boolean> addCollaborator(@RequestBody AddCollaboratorRequest request,
                                                   @PathVariable Long id) {
        return ServerResponseRunner.safeRun((projectId) ->
                projectService.addCollaborator(projectId, request.getEmail()), id);
    }


    @PostMapping("/{id}/collaborators/remove")
    public ServerResponse<Boolean> removeCollaborator(@RequestBody AddCollaboratorRequest request,
                                                      @PathVariable Long id) {
        return ServerResponseRunner.safeRun((projectId) ->
                projectService.removeCollaborator(projectId, request.getEmail()), id);
    }

    @PostMapping("/delete/{id}")
    public ServerResponse<Long> delete(@PathVariable Long id) {
        return ServerResponseRunner.safeRun((projectId -> {
            var currentUser = UserContext.getCurrentUser();
            var project = projectService.findOne(projectId);

            if (!project.getCreator().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Access Denied");
            }

            projectService.delete(projectId);
            return projectId;
        }), id);
    }
}
