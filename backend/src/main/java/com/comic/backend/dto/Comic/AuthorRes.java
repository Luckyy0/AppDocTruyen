package com.comic.backend.dto.Comic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AuthorRes {
    private Long id;

    private String name;

    private String description;

    private Long view;

    private int numberComic;
}
