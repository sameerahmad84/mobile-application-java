package com.st_gen_app.crud.repository;

import com.st_gen_app.crud.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonRepository extends JpaRepository<Season,Integer> {
}