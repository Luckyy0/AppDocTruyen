package com.comic.backend.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.comic.backend.model.CommentChapter;

public interface CommentChapterRepository extends JpaRepository<CommentChapter, Long> {

    @Query("SELECT o FROM CommentChapter o WHERE o.chapter.id = :id")
    List<CommentChapter> findAllByChapterId(Long id, Sort descending);

}
