package com.st_gen_app.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue
    private int userId;
    private String username;
    private String fullName;
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT",length = 16777215)
    private String profileImage;
}
