package com.comic.backend.model;

import com.comic.backend.model.Comic.Comic;
import com.comic.backend.model.User.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowComic {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "comic_id")
    @ManyToOne
    private Comic comic;
}
