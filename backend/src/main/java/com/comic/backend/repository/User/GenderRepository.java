package com.comic.backend.repository.User;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.User.Gender;

public interface GenderRepository extends JpaRepository<Gender, Long> {

}
