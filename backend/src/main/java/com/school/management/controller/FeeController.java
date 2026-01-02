package com.school.management.controller;

import com.school.management.entity.Fee;
import com.school.management.repository.FeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:5173")
public class FeeController {

    @Autowired
    private FeeRepository feeRepository;

    @GetMapping
    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }
    
    @GetMapping("/student/{studentId}")
    public List<Fee> getFeesByStudent(@PathVariable Long studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    @PostMapping
    public Fee createFee(@RequestBody Fee fee) {
        return feeRepository.save(fee);
    }
    
    @PutMapping("/{id}/pay")
    public Fee payFee(@PathVariable Long id) {
        Fee fee = feeRepository.findById(id).orElseThrow(() -> new RuntimeException("Fee not found"));
        fee.setIsPaid(true);
        fee.setPaidDate(java.time.LocalDate.now());
        return feeRepository.save(fee);
    }
}
