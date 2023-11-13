package com.comic.backend.repository.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.User.Subscription;


public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findByDuration(Integer duration);

    Optional<Subscription> findById(Long id);

    @Query("SELECT o FROM Subscription o WHERE o.duration = :search")
    List<Subscription> findAllByDuration(@Param("search") Integer search, Sort ascending);

}
