package com.comic.backend.repository.Comic;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.Comic.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

    Optional<Author> findByName(String name);

}
