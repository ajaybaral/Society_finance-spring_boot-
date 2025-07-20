package com.society.society_finace.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "flat_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlatDetails {

    @Id
    private String flatNo; // Primary key

    private Integer totalMonths;
    private Float totalPaymentAmount;
    private Float totalSinkingFees;
    private Integer totalParkingFees;
    private Integer totalLateFees;
    private BigDecimal totalNonOccupancyFees;
    private Float totalFinalAmount;

    @Column(unique = true, nullable = false)
    private Long receiptNos;
} 