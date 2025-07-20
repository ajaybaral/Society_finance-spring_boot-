package com.society.society_finace.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String monthYear;
    private Long receiptNo;

    @ManyToOne
    @JoinColumn(name = "flat_no", referencedColumnName = "flatNo")
    private FlatDetails flat;

    private Float paymentAmount;
    private Float sinkingFees;
    private Boolean parkingFees;
    private BigDecimal nonOccupancyFees;
    private Boolean lateFees;
    private Float finalAmount;
} 