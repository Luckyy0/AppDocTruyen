package com.comic.backend.model;

import java.time.LocalDateTime;

import com.comic.backend.model.Comic.Chapter;
import com.comic.backend.model.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostPersist;
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
public class CommentChapter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    // @Enumerated(EnumType.STRING)
    // private COMMENT type;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    @JoinColumn(name = "chapter_id")
    @ManyToOne
    private Chapter chapter;

    private LocalDateTime createAt;

    @PostPersist
    private void onCreate() {
        this.createAt = LocalDateTime.now();
    }

    
}
