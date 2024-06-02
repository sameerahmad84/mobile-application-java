package com.st_gen_app.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue
    private int orderId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyyy-MM-dd")
    private Date orderDate;
    private String status;
    private BigDecimal totalAmount;
}
