package com.comic.backend.repository.Comic;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.comic.backend.model.Comic.Comic;

public interface ComicRepository extends JpaRepository<Comic, Long> {

    @Query("SELECT o FROM Comic o INNER JOIN o.genres g "+
        "WHERE ((:searchBy ='' AND :searchByData ='') OR (:searchBy = 'name' AND o.name LIKE %:searchByData%)" +
        "OR(:searchBy = 'author' AND o.author.name LIKE %:searchByData%) OR (:searchBy = 'genres' AND g.name LIKE %:searchByData%))"
        )
    List<Comic> findAllWithFilter(@Param("searchBy") String searchBy,@Param("searchByData") String searchByData);

    List<Comic> findAllById(int parseInt);

}
