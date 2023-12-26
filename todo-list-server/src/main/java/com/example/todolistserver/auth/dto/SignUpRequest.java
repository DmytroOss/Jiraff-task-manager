package com.example.todolistserver.auth.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SignUpRequest {
    private String name;
    private String surname;

    private String email;
    private String username;
    private String password;
}
