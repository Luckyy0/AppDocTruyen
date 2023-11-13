package com.comic.backend.repository.Comic;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.Comic.Comic;
import com.comic.backend.utils.Constants.STATUS;

public interface ComicRepository extends JpaRepository<Comic, Long> {

    @Query("SELECT o FROM Comic o INNER JOIN o.genres g "+
        "WHERE ((:searchBy ='' AND :searchByData ='') OR (:searchBy = 'name' AND o.name LIKE %:searchByData%)" +
        "OR(:searchBy = 'author' AND o.author.name LIKE %:searchByData%) OR (:searchBy = 'genres' AND g.name LIKE %:searchByData%))"
        )
    List<Comic> findAllWithFilter(@Param("searchBy") String searchBy,@Param("searchByData") String searchByData);

    List<Comic> findAllById(int parseInt);

    @Query("SELECT o FROM Comic o "+
        "WHERE (:inSearch = '' OR o.name LIKE %:inSearch% OR o.author.name LIKE %:inSearch%) "+
        "AND (:genreIds IS NULL OR EXISTS (SELECT 1 FROM o.genres g WHERE g.name IN :genreIds)) "+
        "AND (:statusCondition IS NULL OR o.status = :statusCondition) "+
        "AND ((:minChapter IS NULL AND :maxChapter IS NULL) OR (SIZE(o.chapters) BETWEEN :minChapter AND :maxChapter)) "+
        "ORDER BY "+
        "CASE WHEN :sortBy = 'view' THEN o.view END DESC, "+
        "CASE WHEN :sortBy = 'like' THEN SIZE(o.likeComics) END DESC, "+
        "CASE WHEN :sortBy = 'follow' THEN SIZE(o.followComics) END DESC, "+        
        "CASE WHEN :sortBy = 'chapter' THEN (SELECT MAX(ch.createAt) FROM Chapter ch WHERE ch.comic = o) END DESC, "+
        "CASE WHEN :sortBy = 'random' THEN RAND() END")
    List<Comic> findByUserSearch(@Param("inSearch") String inSearch,@Param("sortBy") String sortBy,@Param("genreIds") List<String> genreCondition, STATUS statusCondition, int minChapter, int maxChapter);

}
