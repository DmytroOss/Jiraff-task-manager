package com.example.todolistserver.generic.service;

import com.example.todolistserver.generic.model.JpaEntity;
import com.example.todolistserver.generic.repository.JpaRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public abstract class JpaService<T extends JpaEntity> {
    protected final JpaRepository<T> repository;

    public T findOne(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Page<T> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public T save(T entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
