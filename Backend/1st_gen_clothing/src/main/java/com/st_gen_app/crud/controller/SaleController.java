package com.st_gen_app.crud.controller;

import com.st_gen_app.crud.entity.Sale;
import com.st_gen_app.crud.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping("/add")
    public Sale addSale(@RequestBody Sale sale) {
        return saleService.saveSale(sale);
    }

    @GetMapping("/getAll")
    public List<Sale> getAllSales() {
        return saleService.getAllSales();
    }

    @GetMapping("/get/{id}")
    public Optional<Sale> getSaleById(@PathVariable Integer id) {
        return saleService.getSaleById(id);
    }

    @PutMapping("/update")
    public Sale updateSale(@RequestBody Sale sale) {
        return saleService.updateSale(sale);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSale(@PathVariable Integer id) {
        return saleService.deleteSale(id);
    }
}
