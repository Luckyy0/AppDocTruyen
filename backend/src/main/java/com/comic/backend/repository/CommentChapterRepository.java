package com.comic.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comic.backend.model.CommentChapter;

public interface CommentChapterRepository extends JpaRepository<CommentChapter, Long> {

}
