package com.school.management.controller;

import com.school.management.dto.AuthResponse;
import com.school.management.dto.LoginRequest;
import com.school.management.entity.Student;
import com.school.management.entity.Teacher;
import com.school.management.repository.StudentRepository;
import com.school.management.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        AuthResponse response = new AuthResponse();
        
        if ("admin".equalsIgnoreCase(request.getRole())) {
            if ("admin".equals(request.getEmail()) && "admin".equals(request.getPassword())) {
                response.setMessage("Login Successful");
                response.setRole("admin");
                response.setName("Administrator");
                return response;
            }
        } else if ("teacher".equalsIgnoreCase(request.getRole())) {
            Optional<Teacher> teacher = teacherRepository.findAll().stream()
                .filter(t -> t.getEmail().equals(request.getEmail()) && t.getPassword().equals(request.getPassword()))
                .findFirst();
            
            if (teacher.isPresent()) {
                if (!teacher.get().isApproved()) {
                    throw new RuntimeException("Account not approved by Admin");
                }
                response.setMessage("Login Successful");
                response.setRole("teacher");
                response.setId(teacher.get().getId());
                response.setName(teacher.get().getFirstName() + " " + teacher.get().getLastName());
                return response;
            }
        } else if ("student".equalsIgnoreCase(request.getRole())) {
             Optional<Student> student = studentRepository.findAll().stream()
                .filter(s -> s.getEmail().equals(request.getEmail()) && s.getPassword().equals(request.getPassword()))
                .findFirst();

            if (student.isPresent()) {
                if (!student.get().isApproved()) {
                    throw new RuntimeException("Account not approved by Admin");
                }
                response.setMessage("Login Successful");
                response.setRole("student");
                response.setId(student.get().getId());
                response.setName(student.get().getFirstName() + " " + student.get().getLastName());
                return response;
            }
        }
        
        throw new RuntimeException("Invalid Credentials");
    }
    
    // Approval Endpoints
    @GetMapping("/pending/students")
    public java.util.List<Student> getPendingStudents() {
        return studentRepository.findAll().stream().filter(s -> !s.isApproved()).toList();
    }
    
    @GetMapping("/pending/teachers")
    public java.util.List<Teacher> getPendingTeachers() {
        return teacherRepository.findAll().stream().filter(t -> !t.isApproved()).toList();
    }
    
    @PutMapping("/approve/student/{id}")
    public void approveStudent(@PathVariable Long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        student.setApproved(true);
        studentRepository.save(student);
    }
    
    @PutMapping("/approve/teacher/{id}")
    public void approveTeacher(@PathVariable Long id) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Teacher not found"));
        teacher.setApproved(true);
        teacherRepository.save(teacher);
    }

    @PostMapping("/register/student")
    public Student registerStudent(@RequestBody Student student) {
        // Simple registration without hashing for demo
        return studentRepository.save(student);
    }

    @PostMapping("/register/teacher")
    public Teacher registerTeacher(@RequestBody Teacher teacher) {
        return teacherRepository.save(teacher);
    }
}
