package com.school.management.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String message;
    private String role;
    private Long id; // Student ID or Teacher ID
    private String name;
}
