package com.example.todolistserver.project.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import com.example.todolistserver.generic.dto.JpaDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectWriteDto extends JpaDto {
    private String name;
    private String description;
}
