package com.comic.backend.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.CommentComic;

public interface CommentComicRepository extends JpaRepository<CommentComic,Long>{

    @Query("SELECT o FROM CommentComic o WHERE o.comic.id = :id")
    List<CommentComic> findAllByComicId(@Param("id") Long id, Sort descending);
    
}
