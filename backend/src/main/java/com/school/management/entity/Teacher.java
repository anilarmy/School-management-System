package com.school.management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "teachers")
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isApproved = false;
    private String qualification;
}
