package com.society.society_finace.service;

import com.society.society_finace.entity.FundTransaction;
import com.society.society_finace.repository.FundTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FundTransactionService {

    private final FundTransactionRepository fundTransactionRepository;

    @Autowired
    public FundTransactionService(FundTransactionRepository fundTransactionRepository) {
        this.fundTransactionRepository = fundTransactionRepository;
    }

    public FundTransaction saveTransaction(FundTransaction transaction) {
        return fundTransactionRepository.save(transaction);
    }

    public List<FundTransaction> getAllTransactions() {
        return fundTransactionRepository.findAll();
    }

    public Optional<FundTransaction> getById(Long id) {
        return fundTransactionRepository.findById(id);
    }

    public List<FundTransaction> getByType(FundTransaction.TransactionType type) {
        return fundTransactionRepository.findByType(type);
    }

    public void deleteTransaction(Long id) {
        fundTransactionRepository.deleteById(id);
    }
} 