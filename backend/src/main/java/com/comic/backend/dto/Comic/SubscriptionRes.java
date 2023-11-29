package com.comic.backend.dto.Comic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionRes {
    private Long id;

    private String description;

    private Integer duration;

    private Long price;

    private int purchases;
}
