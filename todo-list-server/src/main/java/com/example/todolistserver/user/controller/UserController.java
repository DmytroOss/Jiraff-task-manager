package com.example.todolistserver.user.controller;

import com.example.todolistserver.generic.util.ServerResponse;
import com.example.todolistserver.generic.util.ServerResponseRunner;
import com.example.todolistserver.user.dto.UserReadDto;
import com.example.todolistserver.user.mapper.UserMapper;
import com.example.todolistserver.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserMapper userMapper;
    private final UserService userService;

    public ServerResponse<UserReadDto> findUserByEmail(String email) {
        return ServerResponseRunner.safeRun(userService::findByEmail,email);
    }
}
