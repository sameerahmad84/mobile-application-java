package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Season;
import com.st_gen_app.crud.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeasonService {

    @Autowired
    private SeasonRepository seasonRepository;

    public Season saveSeason(Season season) {
        return seasonRepository.save(season);
    }

    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    public Optional<Season> getSeasonById(Integer seasonId) {
        return seasonRepository.findById(seasonId);
    }

    public String deleteSeason(Integer seasonId) {
        seasonRepository.deleteById(seasonId);
        return "Season Removed !! " + seasonId;
    }

    public Season updateSeason(Season season) {
        Season existingSeason = seasonRepository.getById(season.getSeasonId());
        existingSeason.setName(season.getName());
        existingSeason.setStartDate(season.getStartDate());
        existingSeason.setEndDate(season.getEndDate());

        return seasonRepository.save(existingSeason);
    }
}