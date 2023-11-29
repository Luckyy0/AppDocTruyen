package com.comic.backend.repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.LikeComic;

public interface LikeComicRepository extends JpaRepository<LikeComic, Long> {

    @Query("SELECT o FROM LikeComic o WHERE o.user.id = :userId AND o.comic.id = :comicId")
    Optional<LikeComic> findByComicAndUser(@Param("userId") Long userId, @Param("comicId") Long comicId);

    @Query("SELECT COUNT(c) FROM LikeComic c WHERE c.comic.id = :comicId")
    Long getTotalLike(@Param("comicId") Long comicId);

    @Query("SELECT o FROM LikeComic o WHERE o.user.id = :userId")
    List<LikeComic> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT c.comic.author.name FROM LikeComic c WHERE c.user.id = :id GROUP BY c.comic.author.name ORDER BY COUNT(c.comic.author.name) DESC")
    List<String> getAuthorByUserId(@Param("id") Long id);

    @Query("SELECT DISTINCT g.name FROM LikeComic v JOIN v.comic.genres g WHERE v.user.id = :id")
    List<String> getGenreByUserId(Long id);

}
