package com.example.todolistserver.user.service;

import com.example.todolistserver.generic.service.JpaService;
import com.example.todolistserver.project.model.Project;
import com.example.todolistserver.user.dto.UserReadDto;
import com.example.todolistserver.user.mapper.UserMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.todolistserver.user.model.User;
import com.example.todolistserver.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService extends JpaService<User> {
    private final UserMapper userMapper;
    public UserService(UserRepository repository, UserMapper userMapper) {
        super(repository);
        this.userMapper = userMapper;
    }

    public UserReadDto findByEmail(String email) {
        var user = ((UserRepository) repository).findByEmail(email).orElseThrow();
        return userMapper.toReadDto(user);
    }

    public User findEntityByEmail(String email) {
        return ((UserRepository) repository).findByEmail(email).orElseThrow();
    }

    public Optional<User> findByUsername(String username) {
         return ((UserRepository) repository).findByUsername(username);
    }

    public List<User> findProjectCollaborators(List<Project> projects) {
        return ((UserRepository) repository).findAllByProjectsIn(projects);
    }
}
