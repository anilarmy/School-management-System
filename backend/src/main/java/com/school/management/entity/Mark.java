package com.school.management.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "marks")
@Data
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    private Double marksObtained;
    private Double maxMarks;
    private String examType; // e.g. "Midterm", "Final"
}
