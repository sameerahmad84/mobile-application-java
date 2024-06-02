package com.st_gen_app.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue
    private Integer categoryId;
    private String name;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT",length = 16777215)
    private String categoryImage;
}
