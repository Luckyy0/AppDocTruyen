package com.comic.backend.model.Comic;

import java.time.LocalDateTime;
import java.util.Set;

import com.comic.backend.model.CommentChapter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
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
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Float chapNumber;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "comic_id")
    private Comic comic;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL)
    private Set<CommentChapter> comments;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @PostPersist
    private void onCreate() {
        this.createAt = LocalDateTime.now();
    }

    @PostUpdate
    private void onUpdate() {
        this.updateAt = LocalDateTime.now();
    }

}
