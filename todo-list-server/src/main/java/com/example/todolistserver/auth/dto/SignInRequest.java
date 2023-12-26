package com.example.todolistserver.auth.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class SignInRequest {
    private String username;
    private String password;
}