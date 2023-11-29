package com.comic.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.comic.backend.dto.AddViewReq;
import com.comic.backend.dto.CheckRes;
import com.comic.backend.dto.CommentChapterReq;
import com.comic.backend.dto.CommentComicReq;
import com.comic.backend.dto.Comic.AuthorReq;
import com.comic.backend.dto.Comic.AuthorRes;
import com.comic.backend.dto.Comic.ChapterReq;
import com.comic.backend.dto.Comic.ChapterRes;
import com.comic.backend.dto.Comic.ComicReq;
import com.comic.backend.dto.Comic.ComicRes;
import com.comic.backend.dto.Comic.GenreReq;
import com.comic.backend.dto.Comic.GenreRes;
import com.comic.backend.model.CommentChapter;
import com.comic.backend.model.CommentComic;
import com.comic.backend.model.Comic.Author;
import com.comic.backend.model.Comic.Chapter;
import com.comic.backend.model.Comic.Comic;
import com.comic.backend.model.Comic.Genre;
import com.comic.backend.model.User.User;
import com.comic.backend.utils.Constants.COMIC;
import com.comic.backend.utils.Constants.STATUS;

@Service
public interface ComicService {

    Genre addGenre(GenreReq genreReq);

    List<GenreRes> getListGenre(String search);

    void deleteGenre(Long id);

    Genre findGenreByName(String name);

    Author findAuthorByName(String name);

    Genre updateGenre(Long id, GenreReq genreReq);

    Author addAuthor(AuthorReq authorReq);

    List<AuthorRes> getListAuthor(String search);

    void deleteAuthor(Long id);

    Author updateAuthor(Long id, AuthorReq authorReq);

    Comic addComic(ComicReq comicReq);

    Comic updateComic(ComicReq comicReq, long id);

    Page<ComicRes> getAllComic(int pageNumber, int pageSize, String searchBy, String searchByData, String inSearch, String sortBy, List<String> genreCondition, STATUS statusCondition, int minChapter, int maxChapter, COMIC typeComic);

    Chapter addChapter(ChapterReq chapterReq);

    Chapter updateChapter(ChapterReq chapterReq, Long id);

    void deleteChapter(Long id);

    void deleteComic(long id);

    Page<ChapterRes> getListChapter(Long comicId, String sort, int pageNumber);

    CommentChapter addCommentChapter(User user, CommentChapterReq commentChapterReq);

    ChapterRes getChapterById(Long id);

    ComicRes getComicById(Long id);

    CommentComic addCommentComic(User user, CommentComicReq commentComicReq);

    void handleLike(User user, Long comicId);

    void handleFollow(User user, Long comicId);

    List<ChapterRes> getAllChapter(Long comicId);

    List<CommentComic> getAllCommentComic(Long id);

    List<CommentChapter> getAllCommentChapter(Long id);

    CheckRes checkLike(User user, Long comicId);

    CheckRes checkFollow(User user, Long comicId);

    void handleAddView(User user, Long comicId, AddViewReq addViewReq);

    ChapterRes getChapterIsReading(User user, Long comicId);

    void addViewComicOnClick(Long id);

    Long comicTotalLike(Long comicId);

    Long comicTotalFollow(Long comicId);

    Long comicTotalChap(Long comicId);

    ChapterRes getChapterFromFreeComicById(Long comicId, Long chapterId);

    ChapterRes getChapterFromPaidComicById(Long comicId, Long chapterId, User user);

    Page<ComicRes> getHotComic(int pageNumber, int pageSize);

    Page<ComicRes> getNominatedComic(int pageNumber, int pageSize, User user);

    void handleDeleteView(User user, Long comicId);

}
