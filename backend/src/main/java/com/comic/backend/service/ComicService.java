package com.comic.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.comic.backend.dto.CommentChapterReq;
import com.comic.backend.dto.CommentComicReq;
import com.comic.backend.dto.Comic.AuthorReq;
import com.comic.backend.dto.Comic.ChapterReq;
import com.comic.backend.dto.Comic.ComicReq;
import com.comic.backend.dto.Comic.GenreReq;
import com.comic.backend.model.CommentChapter;
import com.comic.backend.model.CommentComic;
import com.comic.backend.model.Comic.Author;
import com.comic.backend.model.Comic.Chapter;
import com.comic.backend.model.Comic.Comic;
import com.comic.backend.model.Comic.Genre;
import com.comic.backend.model.User.User;

@Service
public interface ComicService {

    Genre addGenre(GenreReq genreReq);

    List<Genre> getListGenre(String search);

    void deleteGenre(Long id);

    Genre findGenreByName(String name);

    Author findAuthorByName(String name);

    Genre updateGenre(Long id, GenreReq genreReq);

    Author addAuthor(AuthorReq authorReq);

    List<Author> getListAuthor(String search);

    void deleteAuthor(Long id);

    Author updateAuthor(Long id, AuthorReq authorReq);

    Comic addComic(ComicReq comicReq);

    Comic updateComic(ComicReq comicReq, long id);

    Page<Comic> getAllComic(int pageNumber, int pageSize, String searchBy, String searchByData);

    Chapter addChapter(ChapterReq chapterReq);

    Chapter updateChapter(ChapterReq chapterReq, Long id);

    void deleteChapter(Long id);

    void deleteComic(long id);

    Page<Chapter> getListChapter(Long comicId, String sort, int pageNumber);

    CommentChapter addCommentChapter(User user, CommentChapterReq commentChapterReq);

    Chapter getChapterById(Long id);

    Comic getComicById(Long id);

    CommentComic addCommentComic(User user, CommentComicReq commentComicReq);

    void handleLike(User user, Long comicId);

    void handleFollow(User user, Long comicId);

    Page<Comic> getComicFollowByUser(User user, int pageNumber);

    Page<Comic> getComicLikeByUser(User user, int pageNumber);

}
