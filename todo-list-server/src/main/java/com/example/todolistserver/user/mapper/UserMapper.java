package com.example.todolistserver.user.mapper;

import com.example.todolistserver.auth.dto.SignUpRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.mapstruct.InjectionStrategy;

import com.example.todolistserver.user.model.User;

import com.example.todolistserver.user.dto.UserReadDto;

@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserReadDto toReadDto(User user);

    User fromSignUpRequest(SignUpRequest signUpRequest);
}
