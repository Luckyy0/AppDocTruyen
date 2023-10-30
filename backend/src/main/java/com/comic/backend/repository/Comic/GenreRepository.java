package com.comic.backend.repository.Comic;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.Comic.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    

    Optional<Genre> findByName(String name);
}
