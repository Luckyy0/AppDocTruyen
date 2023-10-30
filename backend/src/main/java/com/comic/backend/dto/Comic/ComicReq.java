package com.comic.backend.dto.Comic;

import java.util.List;

import com.comic.backend.utils.Constants.COMIC;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComicReq {
    private String name;
    private String description;
    private Long author_id;
    private COMIC type;
    private List<Long> genres;
}
