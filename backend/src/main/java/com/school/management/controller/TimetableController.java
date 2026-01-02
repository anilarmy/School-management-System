package com.school.management.controller;

import com.school.management.entity.Timetable;
import com.school.management.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/timetables")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableController {

    @Autowired
    private TimetableRepository timetableRepository;

    @GetMapping
    public List<Timetable> getAllTimetables() {
        return timetableRepository.findAll();
    }
    
    @GetMapping("/class/{classId}")
    public List<Timetable> getTimetableByClass(@PathVariable Long classId) {
        return timetableRepository.findByClassRoomId(classId);
    }
    
    @GetMapping("/teacher/{teacherId}")
    public List<Timetable> getTimetableByTeacher(@PathVariable Long teacherId) {
        return timetableRepository.findByTeacherId(teacherId);
    }

    @PostMapping
    public Timetable createTimetable(@RequestBody Timetable timetable) {
        return timetableRepository.save(timetable);
    }
}
