package com.comic.backend.repository.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.User.Subscription;


public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findByDuration(Integer duration);

    Optional<Subscription> findById(Long id);

}
