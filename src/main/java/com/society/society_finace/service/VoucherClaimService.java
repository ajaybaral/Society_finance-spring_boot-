package com.society.society_finace.service;

import com.society.society_finace.entity.VoucherClaim;
import com.society.society_finace.repository.VoucherClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherClaimService {

    private final VoucherClaimRepository voucherClaimRepository;

    @Autowired
    public VoucherClaimService(VoucherClaimRepository voucherClaimRepository) {
        this.voucherClaimRepository = voucherClaimRepository;
    }

    public VoucherClaim saveVoucher(VoucherClaim voucher) {
        return voucherClaimRepository.save(voucher);
    }

    public List<VoucherClaim> getAllVouchers() {
        return voucherClaimRepository.findAll();
    }

    public Optional<VoucherClaim> getVoucherById(Long id) {
        return voucherClaimRepository.findById(id);
    }

    public void deleteVoucher(Long id) {
        voucherClaimRepository.deleteById(id);
    }
} 