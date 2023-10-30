package com.comic.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.LikeComic;
import com.comic.backend.model.Comic.Comic;

public interface LikeComicRepository extends JpaRepository<LikeComic, Long> {

    @Query("SELECT o FROM LikeComic o WHERE o.user.id = :userId AND o.comic.id = :comicId")
    Optional<LikeComic> findByComicAndUser(@Param("userId") Long userId, @Param("comicId") Long comicId);

    @Query("SELECT c FROM Comic c INNER JOIN LikeComic l ON c.id = l.comic.id WHERE l.user.id = :userId")
    List<Comic> getComicByUserLike(@Param("userId") Long userId);

    @Query("SELECT COUNT(c) FROM LikeComic c WHERE c.comic.id = :comicId")
    Long getTotalLike(@Param("comicId") Long comicId);

}
