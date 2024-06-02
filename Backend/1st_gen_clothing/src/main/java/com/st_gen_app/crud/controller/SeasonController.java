package com.st_gen_app.crud.controller;

import com.st_gen_app.crud.entity.Season;
import com.st_gen_app.crud.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/seasons")
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @PostMapping("/add")
    public Season addSeason(@RequestBody Season season) {
        return seasonService.saveSeason(season);
    }

    @GetMapping("/getAll")
    public List<Season> getAllSeasons() {
        return seasonService.getAllSeasons();
    }

    @GetMapping("/get/{id}")
    public Optional<Season> getSeasonById(@PathVariable Integer id) {
        return seasonService.getSeasonById(id);
    }

    @PutMapping("/update")
    public Season updateSeason(@RequestBody Season season) {
        return seasonService.updateSeason(season);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSeason(@PathVariable Integer id) {
        return seasonService.deleteSeason(id);
    }
}