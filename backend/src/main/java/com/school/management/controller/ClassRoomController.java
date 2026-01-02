package com.school.management.controller;

import com.school.management.entity.ClassRoom;
import com.school.management.repository.ClassRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
@CrossOrigin(origins = "http://localhost:5173")
public class ClassRoomController {

    @Autowired
    private ClassRoomRepository classRoomRepository;

    @GetMapping
    public List<ClassRoom> getAllClassRooms() {
        return classRoomRepository.findAll();
    }

    @PostMapping
    public ClassRoom createClassRoom(@RequestBody ClassRoom classRoom) {
        return classRoomRepository.save(classRoom);
    }
}
