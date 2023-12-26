package com.example.todolistserver.project.mapper;

import com.example.todolistserver.project.model.Project;
import com.example.todolistserver.project.dto.ProjectReadDto;
import com.example.todolistserver.project.dto.ProjectWriteDto;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.mapstruct.InjectionStrategy;

@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    ProjectReadDto toReadDto(Project project);
    Project fromWriteDto(ProjectWriteDto projectWriteDto);
}
