package com.society.society_finace.repository;

import com.society.society_finace.entity.FundTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
 
public interface FundTransactionRepository extends JpaRepository<FundTransaction, Long> {
    List<FundTransaction> findByType(FundTransaction.TransactionType type);
} 