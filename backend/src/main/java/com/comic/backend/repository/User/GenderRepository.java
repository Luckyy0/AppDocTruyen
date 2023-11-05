package com.comic.backend.repository.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.User.Gender;
import com.comic.backend.utils.Constants.GENDER;

public interface GenderRepository extends JpaRepository<Gender, Long> {

    Optional<Gender> findByName(GENDER orther);

}
