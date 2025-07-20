package com.society.society_finace.controller;

import com.society.society_finace.entity.VoucherClaim;
import com.society.society_finace.service.VoucherClaimService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
@Tag(name = "Voucher Claims", description = "Voucher claims management APIs")
public class VoucherClaimController {

    private final VoucherClaimService voucherClaimService;

    @Autowired
    public VoucherClaimController(VoucherClaimService voucherClaimService) {
        this.voucherClaimService = voucherClaimService;
    }

    @Operation(summary = "Add voucher claim", description = "Add a new voucher claim (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<VoucherClaim> addVoucher(@RequestBody VoucherClaim voucher) {
        return ResponseEntity.ok(voucherClaimService.saveVoucher(voucher));
    }

    @Operation(summary = "Get all voucher claims", description = "Retrieve all voucher claims (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<VoucherClaim>> getAllVouchers() {
        return ResponseEntity.ok(voucherClaimService.getAllVouchers());
    }

    @Operation(summary = "Get voucher claim by ID", description = "Retrieve a specific voucher claim by ID (Admin and User roles)")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<VoucherClaim> getVoucher(@PathVariable Long id) {
        return voucherClaimService.getVoucherById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete voucher claim", description = "Delete a voucher claim by ID (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoucher(@PathVariable Long id) {
        voucherClaimService.deleteVoucher(id);
        return ResponseEntity.noContent().build();
    }
} 