package com.comic.backend.dto.Comic;

import java.time.LocalDateTime;
import java.util.List;

import com.comic.backend.model.Comic.Genre;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChapterRes {
    private Long chapId;
    private Float chapNumber;
    private String title;
    private String content;
    private Long comicId;
    private String comicName;
    private String image;
    private List<Genre> genres;
    private String author;
    private String comicType;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Long minute;
}
