package com.comic.backend.dto.Comic;

import java.time.LocalDateTime;

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
    private String comicName;
    private String genre;
    private String author;
    private String comicType;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Long minute;
}
