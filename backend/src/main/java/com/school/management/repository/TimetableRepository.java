package com.school.management.repository;

import com.school.management.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    List<Timetable> findByClassRoomId(Long classRoomId);
    List<Timetable> findByTeacherId(Long teacherId);
}
