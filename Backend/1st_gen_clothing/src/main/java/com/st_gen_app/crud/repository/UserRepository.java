package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}