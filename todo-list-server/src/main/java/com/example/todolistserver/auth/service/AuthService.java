package com.example.todolistserver.auth.service;

import com.example.todolistserver.auth.dto.ValidateRequest;
import lombok.RequiredArgsConstructor;

import com.example.todolistserver.auth.dto.AuthResponse;
import com.example.todolistserver.auth.dto.SignInRequest;
import com.example.todolistserver.auth.dto.SignUpRequest;

import com.example.todolistserver.jwt.JwtService;

import com.example.todolistserver.user.model.User;
import com.example.todolistserver.user.mapper.UserMapper;
import com.example.todolistserver.user.service.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse signUp(SignUpRequest request) {
        User user = userMapper.fromSignUpRequest(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User userRecorded = userService.save(user);

        if (userRecorded == null) {
            return new AuthResponse("Persistence failed", null);
        }

        return new AuthResponse(
                jwtService.generateJwt(userRecorded),
                userMapper.toReadDto(userRecorded)
        );
    }

    public AuthResponse signIn(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User userExtracted = userService.findByUsername(request.getUsername()).orElseThrow();
        return new AuthResponse(
                jwtService.generateJwt(userExtracted),
                userMapper.toReadDto(userExtracted)
        );
    }

    public AuthResponse validate(ValidateRequest request) {
        var username = jwtService.extractUserName(request.getToken());
        User userExtracted = userService.findByUsername(username).orElseThrow();
        return new AuthResponse(
                jwtService.generateJwt(userExtracted),
                userMapper.toReadDto(userExtracted)
        );
    }
}
