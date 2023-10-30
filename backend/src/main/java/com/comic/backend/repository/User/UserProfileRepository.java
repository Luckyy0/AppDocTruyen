package com.comic.backend.repository.User;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.User.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

}
