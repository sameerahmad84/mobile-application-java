package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
}