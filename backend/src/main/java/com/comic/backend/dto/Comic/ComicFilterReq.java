package com.comic.backend.dto.Comic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComicFilterReq {
    private int pageNumber;
    private int pageSize;
}
