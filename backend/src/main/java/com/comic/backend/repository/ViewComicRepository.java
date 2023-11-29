package com.comic.backend.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.ViewComic;

public interface ViewComicRepository extends JpaRepository<ViewComic,Long>{
    @Query("SELECT o FROM ViewComic o WHERE o.user.id = :userId AND o.comic.id = :comicId")
    Optional<ViewComic> findByComicAndUser(@Param("userId") Long userId, @Param("comicId") Long comicId);

    @Query("SELECT o FROM ViewComic o WHERE o.user.id = :userId ORDER BY updateAt")
    List<ViewComic> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT c.comic.author.name FROM ViewComic c WHERE c.user.id = :id GROUP BY c.comic.author.name ORDER BY COUNT(c.comic.author.name) DESC")
    List <String> getAuthorByUserId(@Param("id") Long id);

    @Query("SELECT DISTINCT g.name FROM ViewComic v JOIN v.comic.genres g WHERE v.user.id = :id")
    List<String> getGenreByUserId(@Param("id") Long id);
}
