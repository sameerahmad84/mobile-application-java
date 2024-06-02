package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Sale;
import com.st_gen_app.crud.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    public Sale saveSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Optional<Sale> getSaleById(Integer saleId) {
        return saleRepository.findById(saleId);
    }

    public String deleteSale(Integer saleId) {
        saleRepository.deleteById(saleId);
        return "Sale Removed !! " + saleId;
    }

    public Sale updateSale(Sale sale) {
        Sale existingSale = saleRepository.getById(sale.getSaleId());
        existingSale.setName(sale.getName());
        existingSale.setStartDate(sale.getStartDate());
        existingSale.setEndDate(sale.getEndDate());

        return saleRepository.save(existingSale);
    }
}