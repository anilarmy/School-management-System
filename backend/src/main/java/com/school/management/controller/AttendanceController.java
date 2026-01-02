package com.school.management.controller;

import com.school.management.entity.Attendance;
import com.school.management.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
    
    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendanceByStudent(@PathVariable Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }
}
