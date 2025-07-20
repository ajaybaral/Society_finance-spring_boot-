package com.society.society_finace.controller;

import com.society.society_finace.entity.MaintenanceRecord;
import com.society.society_finace.service.MaintenanceRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@Tag(name = "Maintenance Records", description = "Maintenance records management APIs")
public class MaintenanceRecordController {

    private final MaintenanceRecordService maintenanceService;

    @Autowired
    public MaintenanceRecordController(MaintenanceRecordService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @Operation(summary = "Add maintenance record", description = "Add a new maintenance record (Admin only)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<MaintenanceRecord> addRecord(@RequestBody MaintenanceRecord record) {
        return ResponseEntity.ok(maintenanceService.saveRecord(record));
    }

    @Operation(summary = "Get all maintenance records", description = "Retrieve all maintenance records (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<MaintenanceRecord>> getAllRecords() {
        return ResponseEntity.ok(maintenanceService.getAllRecords());
    }

    @Operation(summary = "Get maintenance record by ID", description = "Retrieve a specific maintenance record by ID (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRecord> getRecord(@PathVariable Long id) {
        return maintenanceService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Get maintenance records by flat", description = "Retrieve all maintenance records for a specific flat (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/flat/{flatNo}")
    public ResponseEntity<List<MaintenanceRecord>> getRecordsByFlat(@PathVariable String flatNo) {
        return ResponseEntity.ok(maintenanceService.getByFlat(flatNo));
    }

    @Operation(summary = "Delete maintenance record", description = "Delete a maintenance record by ID (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        maintenanceService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
} 