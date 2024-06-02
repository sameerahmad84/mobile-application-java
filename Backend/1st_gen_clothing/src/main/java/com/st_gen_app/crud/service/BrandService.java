package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Brand;
import com.st_gen_app.crud.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public Brand saveBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Optional<Brand> getBrandById(Integer brandId) {
        return brandRepository.findById(brandId);
    }

    public String deleteBrand(Integer brandId) {
        brandRepository.deleteById(brandId);
        return "Brand Removed !! " + brandId;
    }

    public Brand updateBrand(Brand brand) {
        Brand existingBrand = brandRepository.getById(brand.getBrandId());
        existingBrand.setName(brand.getName());

        return brandRepository.save(existingBrand);
    }
}
