package com.school.management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "classrooms")
@Data
public class ClassRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "6A"

    @OneToOne
    @JoinColumn(name = "teacher_id")
    private Teacher classTeacher;
}
