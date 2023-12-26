package com.example.todolistserver.task.mapper;

import com.example.todolistserver.task.model.Task;
import com.example.todolistserver.task.dto.TaskReadDto;
import com.example.todolistserver.task.dto.TaskWriteDto;

import com.example.todolistserver.user.dto.UserReadDto;
import com.example.todolistserver.user.mapper.UserMapper;
import com.example.todolistserver.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.mapstruct.InjectionStrategy;

@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    TaskReadDto toReadDto(Task task);

    @Mapping(target = "project", ignore = true)
    @Mapping(target = "assignee", ignore = true)
    Task fromWriteDto(TaskWriteDto taskWriteDto);

    default UserReadDto mapUser(User user) {
        var userReadDto = Mappers.getMapper(UserMapper.class).toReadDto(user);
        userReadDto.setId(user.getId());
        return userReadDto;
    }
}

