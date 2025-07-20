package com.society.society_finace.repository;

import com.society.society_finace.entity.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
 
public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {
    List<MaintenanceRecord> findByFlat_FlatNo(String flatNo);
} 