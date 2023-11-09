package com.comic.backend.repository.Comic;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.Comic.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    

    Optional<Genre> findByName(String name);

     @Query("SELECT o FROM Genre o WHERE o.name LIKE %:search%")
    List<Genre> findAllByName(@Param("search") String search, Sort ascending);
}
