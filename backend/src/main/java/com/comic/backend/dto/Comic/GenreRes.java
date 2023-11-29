package com.comic.backend.dto.Comic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GenreRes {
    private Long id;

    private String name;  

    private Long view;

    private int numberComic;
}
