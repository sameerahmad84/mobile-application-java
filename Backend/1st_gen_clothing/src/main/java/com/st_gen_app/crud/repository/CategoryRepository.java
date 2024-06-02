package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}