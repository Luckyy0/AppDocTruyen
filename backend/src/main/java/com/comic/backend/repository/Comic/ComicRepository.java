package com.comic.backend.repository.Comic;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.Comic.Comic;

public interface ComicRepository extends JpaRepository<Comic, Long> {

}
