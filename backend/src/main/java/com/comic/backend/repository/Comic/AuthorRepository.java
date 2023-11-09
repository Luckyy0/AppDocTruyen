package com.comic.backend.repository.Comic;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.Comic.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    Optional<Author> findByName(String name);

    @Query("SELECT o FROM Author o WHERE o.name LIKE %:search%")
    List<Author> findAllByName(@Param("search") String search, Sort ascending);

}
