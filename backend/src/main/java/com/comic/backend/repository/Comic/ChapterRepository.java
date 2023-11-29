package com.comic.backend.repository.Comic;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.Comic.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    @Query("SELECT o FROM Chapter o WHERE o.comic.id = :id")
    List<Chapter> findAllByComicId(Sort sort2, @Param("id") Long id);

    @Query("SELECT COUNT(c) FROM Chapter c WHERE c.comic.id = :comicId")
    Long getTotalChap(@Param("comicId") Long comicId);
    
}
