package com.example.todolistserver.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.example.todolistserver.generic.dto.JpaDto;


@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class UserReadDto extends JpaDto {
    private String name;
    private String surname;

    private String email;
    private String username;
}
