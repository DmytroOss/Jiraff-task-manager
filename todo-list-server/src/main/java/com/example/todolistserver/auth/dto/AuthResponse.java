package com.example.todolistserver.auth.dto;

import com.example.todolistserver.user.dto.UserReadDto;
import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserReadDto user;
}
