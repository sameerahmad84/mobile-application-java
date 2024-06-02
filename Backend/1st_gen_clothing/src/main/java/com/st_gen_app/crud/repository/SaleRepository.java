package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale,Integer> {
}