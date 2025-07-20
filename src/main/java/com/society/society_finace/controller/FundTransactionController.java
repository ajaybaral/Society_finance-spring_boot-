package com.society.society_finace.controller;

import com.society.society_finace.entity.FundTransaction;
import com.society.society_finace.service.FundTransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funds")
@Tag(name = "Fund Transactions", description = "Fund transactions management APIs")
public class FundTransactionController {

    private final FundTransactionService fundService;

    @Autowired
    public FundTransactionController(FundTransactionService fundService) {
        this.fundService = fundService;
    }

    @Operation(summary = "Add fund transaction", description = "Add a new fund transaction (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<FundTransaction> addTransaction(@RequestBody FundTransaction transaction) {
        return ResponseEntity.ok(fundService.saveTransaction(transaction));
    }

    @Operation(summary = "Get all fund transactions", description = "Retrieve all fund transactions (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<FundTransaction>> getAllTransactions() {
        return ResponseEntity.ok(fundService.getAllTransactions());
    }

    @Operation(summary = "Get fund transaction by ID", description = "Retrieve a specific fund transaction by ID (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<FundTransaction> getTransaction(@PathVariable Long id) {
        return fundService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Get fund transactions by type", description = "Retrieve fund transactions by type (CREDIT/DEBIT) (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/type/{type}")
    public ResponseEntity<List<FundTransaction>> getByType(@PathVariable FundTransaction.TransactionType type) {
        return ResponseEntity.ok(fundService.getByType(type));
    }

    @Operation(summary = "Delete fund transaction", description = "Delete a fund transaction by ID (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        fundService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
} 