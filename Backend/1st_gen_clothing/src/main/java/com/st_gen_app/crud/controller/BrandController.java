package com.st_gen_app.crud.controller;

import com.st_gen_app.crud.entity.Brand;
import com.st_gen_app.crud.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @PostMapping("/add")
    public Brand addBrand(@RequestBody Brand brand) {
        return brandService.saveBrand(brand);
    }

    @GetMapping("/getAll")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/get/{id}")
    public Optional<Brand> getBrandById(@PathVariable Integer id) {
        return brandService.getBrandById(id);
    }

    @PutMapping("/update")
    public Brand updateBrand(@RequestBody Brand brand) {
        return brandService.updateBrand(brand);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBrand(@PathVariable Integer id) {
        return brandService.deleteBrand(id);
    }


}