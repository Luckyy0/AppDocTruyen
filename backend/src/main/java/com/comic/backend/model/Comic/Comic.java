package com.comic.backend.model.Comic;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.comic.backend.model.CommentComic;
import com.comic.backend.model.FollowComic;
import com.comic.backend.model.LikeComic;
import com.comic.backend.utils.Constants.COMIC;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private COMIC type;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "genre_comic", joinColumns = @JoinColumn(name = "comic_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "id"))
    private List<Genre> genres = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    @Default
    @OneToMany(mappedBy = "comic")
    private List<Chapter> chapters = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "comic")
    private Set<CommentComic> comments;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "comic")
    private Set<FollowComic> followComics;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "comic")
    private Set<LikeComic> likeComics;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @PostPersist
    private void onCreate() {
        this.createAt = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        this.updateAt = LocalDateTime.now();
    }
}
