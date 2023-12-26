package com.example.todolistserver.generic.util;

import com.example.todolistserver.auth.dto.AuthResponse;
import org.springframework.http.HttpStatus;

import java.util.function.Function;

public class ServerResponseRunner {
    public static <A, T> ServerResponse<T> safeRun(Function<A, T> function, A args) {
        ServerResponse<T> serverResponse;

        try {
            T data = function.apply(args);
            serverResponse = ServerResponse.<T>builder()
                    .msg("")
                    .data(data)
                    .status(HttpStatus.OK)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            serverResponse = ServerResponse.<T>builder()
                    .msg(e.getMessage())
                    .data(null)
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }

        return serverResponse;
    }
}
