package com.st_gen_app.crud.controller;

import com.st_gen_app.crud.entity.Discount;
import com.st_gen_app.crud.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/discounts")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @PostMapping("/add")
    public Discount addDiscount(@RequestBody Discount discount) {
        return discountService.saveDiscount(discount);
    }

    @GetMapping("/getAll")
    public List<Discount> getAllDiscounts() {
        return discountService.getAllDiscounts();
    }

    @GetMapping("/get/{id}")
    public Optional<Discount> getDiscountById(@PathVariable Integer id) {
        return discountService.getDiscountById(id);
    }

    @PutMapping("/update")
    public Discount updateDiscount(@RequestBody Discount discount) {
        return discountService.updateDiscount(discount);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDiscount(@PathVariable Integer id) {
        return discountService.deleteDiscount(id);
    }
}