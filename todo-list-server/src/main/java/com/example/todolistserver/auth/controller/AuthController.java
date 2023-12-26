package com.example.todolistserver.auth.controller;

import com.example.todolistserver.auth.dto.ValidateRequest;
import com.example.todolistserver.generic.util.ServerResponse;
import com.example.todolistserver.generic.util.ServerResponseRunner;
import lombok.RequiredArgsConstructor;

import com.example.todolistserver.auth.dto.AuthResponse;
import com.example.todolistserver.auth.dto.SignInRequest;
import com.example.todolistserver.auth.dto.SignUpRequest;
import com.example.todolistserver.auth.service.AuthService;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ServerResponse<AuthResponse> signUp(@RequestBody SignUpRequest request) {
        return ServerResponseRunner.safeRun(authService::signUp, request);
    }

    @PostMapping("/sign-in")
    public ServerResponse<AuthResponse> signIn(@RequestBody SignInRequest request) {
        return ServerResponseRunner.safeRun(authService::signIn, request);
    }

    @PostMapping("/validate")
    public ServerResponse<AuthResponse> validate(@RequestBody ValidateRequest request) {
        return ServerResponseRunner.safeRun(authService::validate, request);
    }
}