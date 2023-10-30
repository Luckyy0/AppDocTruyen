package com.comic.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.FollowComic;
import com.comic.backend.model.Comic.Comic;

public interface FollowComicRepository extends JpaRepository<FollowComic, Long> {
    @Query("SELECT o FROM FollowComic o WHERE o.user.id = :userId AND o.comic.id = :comicId")
    Optional<FollowComic> findByComicAndUser(@Param("userId") Long userId, @Param("comicId") Long comicId);

    @Query("SELECT c FROM Comic c INNER JOIN FollowComic f ON c.id = f.comic.id WHERE f.user.id = :userId")
    List<Comic> getComicByUserFollow(@Param("userId") Long userId);

    @Query("SELECT COUNT(c) FROM FollowComic c WHERE c.comic.id = :comicId")
    Long getTotalFollow(@Param("comicId") Long comicId);

}
