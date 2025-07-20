package com.society.society_finace.controller;

import com.society.society_finace.entity.FlatDetails;
import com.society.society_finace.service.FlatDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flats")
@Tag(name = "Flat Management", description = "Flat details management APIs")
public class FlatDetailsController {

    private final FlatDetailsService flatService;

    @Autowired
    public FlatDetailsController(FlatDetailsService flatService) {
        this.flatService = flatService;
    }

    @Operation(summary = "Add a new flat", description = "Add a new flat to the system (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<FlatDetails> addFlat(@RequestBody FlatDetails flat) {
        return ResponseEntity.ok(flatService.saveFlatDetails(flat));
    }

    @Operation(summary = "Get all flats", description = "Retrieve all flats (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<FlatDetails>> getAllFlats() {
        return ResponseEntity.ok(flatService.getAllFlats());
    }

    @Operation(summary = "Get flat by flat number", description = "Retrieve a specific flat by flat number (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{flatNo}")
    public ResponseEntity<FlatDetails> getFlat(@PathVariable String flatNo) {
        return flatService.getFlatById(flatNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete flat", description = "Delete a flat by flat number (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{flatNo}")
    public ResponseEntity<Void> deleteFlat(@PathVariable String flatNo) {
        flatService.deleteFlat(flatNo);
        return ResponseEntity.noContent().build();
    }
} 