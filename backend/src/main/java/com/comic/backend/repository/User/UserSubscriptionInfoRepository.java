package com.comic.backend.repository.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.User.UserSubscriptionInfo;

public interface UserSubscriptionInfoRepository extends JpaRepository<UserSubscriptionInfo, Long> {

    @Query("SELECT o FROM UserSubscriptionInfo o WHERE o.user.id = :userId ORDER BY createAt DESC LIMIT 1")
    Optional<UserSubscriptionInfo> findFirstByUserIdOrderByCreateDateDesc(@Param("userId") long userId);
}
