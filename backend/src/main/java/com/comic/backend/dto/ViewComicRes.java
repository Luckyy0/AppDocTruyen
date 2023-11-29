package com.comic.backend.dto;

import java.time.LocalDateTime;

import com.comic.backend.dto.Comic.ComicRes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewComicRes {
    private Long chapId;
    private Float chapNumber;
    private String chapTitle;

    private ComicRes comic;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
