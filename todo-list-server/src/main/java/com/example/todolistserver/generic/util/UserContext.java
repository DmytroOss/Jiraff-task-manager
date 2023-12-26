package com.example.todolistserver.generic.util;

import com.example.todolistserver.user.model.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserContext {
    public static User getCurrentUser() {
        return ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
