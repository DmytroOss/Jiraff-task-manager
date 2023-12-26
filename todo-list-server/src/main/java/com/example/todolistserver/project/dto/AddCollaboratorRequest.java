package com.example.todolistserver.project.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AddCollaboratorRequest {
    private String email;
}
