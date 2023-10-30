package com.comic.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.CommentComic;

public interface CommentComicRepository extends JpaRepository<CommentComic,Long>{
    
}
