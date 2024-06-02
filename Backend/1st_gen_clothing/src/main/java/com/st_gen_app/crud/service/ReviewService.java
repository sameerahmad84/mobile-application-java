package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Review;
import com.st_gen_app.crud.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Integer reviewId) {
        return reviewRepository.findById(reviewId);
    }

    public String deleteReview(Integer reviewId) {
        reviewRepository.deleteById(reviewId);
        return "Review Removed !! " + reviewId;
    }

    public Review updateReview(Review review) {
        Review existingReview = reviewRepository.getById(review.getReviewId());
        existingReview.setUser(review.getUser());
        existingReview.setProduct(review.getProduct());
        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());
        existingReview.setReviewDate(review.getReviewDate());

        return reviewRepository.save(existingReview);
    }
}
