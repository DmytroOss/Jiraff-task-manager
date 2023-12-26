package com.example.todolistserver.task.controller;

import com.example.todolistserver.generic.util.ServerResponse;
import com.example.todolistserver.generic.util.ServerResponseRunner;
import com.example.todolistserver.project.mapper.ProjectMapper;
import com.example.todolistserver.project.service.ProjectService;
import com.example.todolistserver.task.dto.TaskReadDto;
import com.example.todolistserver.task.dto.TaskWriteDto;
import com.example.todolistserver.task.enumerable.TaskStatus;
import com.example.todolistserver.task.mapper.TaskMapper;
import com.example.todolistserver.task.service.TaskService;
import com.example.todolistserver.user.service.UserService;
import com.sun.tools.jconsole.JConsoleContext;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskMapper taskMapper;
    private final TaskService taskService;
    private final UserService userService;
    private final ProjectMapper projectMapper;
    private final ProjectService projectService;

    @GetMapping("/statuses")
    public ServerResponse<List<TaskStatus>> findTaskStatuses() {
        return ServerResponseRunner.safeRun((x) -> List.of(TaskStatus.values()), null);
    }

    @GetMapping("/project/{id}")
    public ServerResponse<List<TaskReadDto>> findTasksByProjectId(@PathVariable Long id) {
        return ServerResponseRunner.safeRun((projectId -> {
            var tasks = taskService.findAllByProjectId(projectId);
            return tasks.stream().map(taskMapper::toReadDto).toList();
        }), id);
    }

    @PostMapping("/project/{id}")
    public ServerResponse<TaskReadDto> saveTask(@RequestBody TaskWriteDto writeDto,
                                                @PathVariable Long id) {
        return ServerResponseRunner.safeRun((taskWriteDto -> {
            var assignee = userService.findOne(taskWriteDto.getAssigneeId());

            var task = taskMapper.fromWriteDto(taskWriteDto);
            task.setId(taskWriteDto.getId());
            task.setAssignee(assignee);
            task.setProject(projectService.findOne(id));

            return taskMapper.toReadDto(taskService.save(task));
        }), writeDto);
    }

    @PostMapping("/delete/{id}")
    public ServerResponse<Long> deleteTask(@PathVariable Long id) {
        return ServerResponseRunner.safeRun((taskId -> {
            taskService.delete(taskId);
            return taskId;
        }), id);
    }
}
