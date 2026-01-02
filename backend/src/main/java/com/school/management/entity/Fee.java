package com.school.management.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "fees")
@Data
public class Fee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private String title; // e.g. "Tuition Fee - Jan"
    private Double amount;
    private Boolean isPaid;
    private LocalDate dueDate;
    private LocalDate paidDate;
}
