package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Discount;
import com.st_gen_app.crud.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    public Discount saveDiscount(Discount discount) {
        return discountRepository.save(discount);
    }

    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

    public Optional<Discount> getDiscountById(Integer discountId) {
        return discountRepository.findById(discountId);
    }

    public String deleteDiscount(Integer discountId) {
        discountRepository.deleteById(discountId);
        return "Discount Removed !! " + discountId;
    }

    public Discount updateDiscount(Discount discount) {
        Discount existingDiscount = discountRepository.getById(discount.getDiscountId());
        existingDiscount.setProduct(discount.getProduct());
        existingDiscount.setSale(discount.getSale());
        existingDiscount.setDiscountPercentage(discount.getDiscountPercentage());
        existingDiscount.setStartDate(discount.getStartDate());
        existingDiscount.setEndDate(discount.getEndDate());

        return discountRepository.save(existingDiscount);
    }
}
