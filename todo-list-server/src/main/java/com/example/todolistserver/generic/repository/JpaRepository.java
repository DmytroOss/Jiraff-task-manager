package com.example.todolistserver.generic.repository;

import com.example.todolistserver.generic.model.JpaEntity;

public interface JpaRepository<T extends JpaEntity> extends org.springframework.data.jpa.repository.JpaRepository<T, Long> {
}
