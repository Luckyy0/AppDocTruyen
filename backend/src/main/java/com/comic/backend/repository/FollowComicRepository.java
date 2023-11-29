package com.comic.backend.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.FollowComic;

public interface FollowComicRepository extends JpaRepository<FollowComic, Long> {
    @Query("SELECT o FROM FollowComic o WHERE o.user.id = :userId AND o.comic.id = :comicId")
    Optional<FollowComic> findByComicAndUser(@Param("userId") Long userId, @Param("comicId") Long comicId);

    @Query("SELECT COUNT(c) FROM FollowComic c WHERE c.comic.id = :comicId")
    Long getTotalFollow(@Param("comicId") Long comicId);

    @Query("SELECT o FROM FollowComic o WHERE o.user.id = :userId")
    List<FollowComic> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT c.comic.author.name FROM FollowComic c WHERE c.user.id = :id GROUP BY c.comic.author.name ORDER BY COUNT(c.comic.author.name) DESC")
    List<String> getAuthorByUserId(@Param("id") Long id);
    @Query("SELECT DISTINCT g.name FROM FollowComic v JOIN v.comic.genres g WHERE v.user.id = :id")
    List<String> getGenreByUserId(@Param("id") Long id);

}
