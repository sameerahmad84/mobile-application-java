package com.st_gen_app.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue
    private Integer productId;
    private String name;

    @Lob
    @Column(length = 1000)
    private String description;
    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private double price;
    @ManyToOne
    @JoinColumn(name = "season_id")
    private Season season;

    @Lob
    @Column(columnDefinition = "MEDIUMTEXT",length = 16777215)
    private String productImage1;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT",length = 16777215)
    private String productImage2;
}
