package com.comic.backend.dto.Comic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChapterReq {
    private Float chapNumber;
    private String title;
    private String content;
    private Long comicId;
}
