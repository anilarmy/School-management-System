package com.school.management.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
    private String role; // "admin", "teacher", "student"
}
