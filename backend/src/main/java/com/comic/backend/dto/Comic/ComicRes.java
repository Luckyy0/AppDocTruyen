package com.comic.backend.dto.Comic;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.comic.backend.model.CommentComic;
import com.comic.backend.model.LikeComic;
import com.comic.backend.model.Comic.Author;
import com.comic.backend.model.Comic.Genre;
import com.comic.backend.utils.Constants.COMIC;
import com.comic.backend.utils.Constants.STATUS;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComicRes {
    private Long id;

    private String name;

    private String image;

    private String description;

    private COMIC type;

    private STATUS status;

    private Long view;

    private List<Genre> genres;

    private Author author;

    private int comment;

    private Long follow;

    private Long like;

    private Long chap;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

}
