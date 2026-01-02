package com.school.management.controller;

import com.school.management.entity.Mark;
import com.school.management.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "http://localhost:5173")
public class MarkController {

    @Autowired
    private MarkRepository markRepository;

    @GetMapping
    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }
    
    @GetMapping("/student/{studentId}")
    public List<Mark> getMarksByStudent(@PathVariable Long studentId) {
        return markRepository.findByStudentId(studentId);
    }

    @PostMapping
    public Mark addMark(@RequestBody Mark mark) {
        return markRepository.save(mark);
    }
}
