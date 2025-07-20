package com.society.society_finace.service;

import com.society.society_finace.entity.MaintenanceRecord;
import com.society.society_finace.repository.MaintenanceRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceRecordService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;

    @Autowired
    public MaintenanceRecordService(MaintenanceRecordRepository maintenanceRecordRepository) {
        this.maintenanceRecordRepository = maintenanceRecordRepository;
    }

    public MaintenanceRecord saveRecord(MaintenanceRecord record) {
        return maintenanceRecordRepository.save(record);
    }

    public List<MaintenanceRecord> getAllRecords() {
        return maintenanceRecordRepository.findAll();
    }

    public Optional<MaintenanceRecord> getById(Long id) {
        return maintenanceRecordRepository.findById(id);
    }

    public List<MaintenanceRecord> getByFlat(String flatNo) {
        return maintenanceRecordRepository.findByFlat_FlatNo(flatNo);
    }

    public void deleteRecord(Long id) {
        maintenanceRecordRepository.deleteById(id);
    }
} 