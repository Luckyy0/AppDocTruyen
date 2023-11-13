package com.comic.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.comic.backend.dto.CommentComicReq;
import com.comic.backend.dto.Comic.AuthorReq;
import com.comic.backend.dto.Comic.ComicReq;
import com.comic.backend.dto.Comic.GenreReq;
import com.comic.backend.dto.User.ApiResponse;
import com.comic.backend.model.CommentComic;
import com.comic.backend.model.Comic.Author;
import com.comic.backend.model.Comic.Comic;
import com.comic.backend.model.Comic.Genre;
import com.comic.backend.model.User.User;
import com.comic.backend.service.ComicService;
import com.comic.backend.service.UserService;
import com.comic.backend.utils.CommonFunction;
import com.comic.backend.utils.Constants.CommonConstants;
import com.comic.backend.utils.Constants.JsonConstant;
import com.comic.backend.utils.Constants.PathConstants;
import com.comic.backend.utils.Constants.STATUS;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@RequestMapping
public class ComicController {

    @Autowired
    private ComicService comicService;

    @Autowired
    private UserService userService;

    @PostMapping(PathConstants.GENRE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addGenre(@RequestBody String genreReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ComicController.class, genreReqStr,
                JsonConstant.JSON_REQ_GENRE);
        GenreReq genreReq = CommonFunction.stringJsonToObject(GenreReq.class, genreReqStr);
        Genre genre = comicService.addGenre(genreReq);
        return new ResponseEntity<>(genre, HttpStatus.OK);
    }

    @GetMapping("/genre")
    public ResponseEntity<?> getListGenre(@RequestParam(defaultValue = "") String search) {
        List<Genre> genres = comicService.getListGenre(search);
        return new ResponseEntity<>(genres, HttpStatus.OK);
    }

    @DeleteMapping(PathConstants.GENRE + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteGenre(@PathVariable("id") Long id) {
        comicService.deleteGenre(id);
        return new ResponseEntity<>(new ApiResponse("Delete Successfully"), HttpStatus.OK);
    }

    @PutMapping(PathConstants.GENRE + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateGenre(@PathVariable("id") Long id, @RequestBody String genreReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ComicController.class, genreReqStr,
                JsonConstant.JSON_REQ_GENRE);
        GenreReq genreReq = CommonFunction.stringJsonToObject(GenreReq.class, genreReqStr);
        Genre genre = comicService.updateGenre(id, genreReq);
        return new ResponseEntity<>(genre, HttpStatus.OK);
    }

    @PostMapping(PathConstants.AUTHOR)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addAuthor(@RequestBody String authorReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ComicController.class, authorReqStr,
                JsonConstant.JSON_REQ_AUTHOR);
        AuthorReq authorReq = CommonFunction.stringJsonToObject(AuthorReq.class, authorReqStr);
        Author author = comicService.addAuthor(authorReq);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping("/author")
    public ResponseEntity<?> getListAuthor(@RequestParam(defaultValue = "") String search) {
        List<Author> authors = comicService.getListAuthor(search);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(PathConstants.AUTHOR + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAuthor(@PathVariable("id") Long id) {
        comicService.deleteAuthor(id);
        return new ResponseEntity<>(new ApiResponse("Delete Successfully"), HttpStatus.OK);
    }

    @PutMapping(PathConstants.AUTHOR + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateAuthor(@PathVariable("id") Long id, @RequestBody String authorReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ComicController.class, authorReqStr,
                JsonConstant.JSON_REQ_AUTHOR);
        AuthorReq authorReq = CommonFunction.stringJsonToObject(AuthorReq.class, authorReqStr);
        Author author = comicService.updateAuthor(id, authorReq);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PostMapping(PathConstants.COMIC)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addComic(@RequestBody String comicReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ComicController.class, comicReqStr, JsonConstant.JSON_REQ_COMIC);
        ComicReq comicReq = CommonFunction.stringJsonToObject(ComicReq.class, comicReqStr);
        Comic comic = comicService.addComic(comicReq);
        return new ResponseEntity<>(comic, HttpStatus.OK);
    }

    @PutMapping(PathConstants.COMIC + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateComic(
            @RequestBody String comicReqStr,
            @PathVariable("id") long id)
            throws JsonMappingException, JsonProcessingException {

        CommonFunction.jsonValidate(ComicController.class, comicReqStr, JsonConstant.JSON_REQ_COMIC);
        ComicReq comicReq = CommonFunction.stringJsonToObject(ComicReq.class, comicReqStr);
        Comic comic = comicService.updateComic(comicReq, id);
        return new ResponseEntity<>(comic, HttpStatus.OK);
    }

    @DeleteMapping(PathConstants.COMIC + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateComic(@PathVariable("id") long id) {
        comicService.deleteComic(id);
        return new ResponseEntity<>(new ApiResponse("Xóa thành công"), HttpStatus.OK);
    }

    @GetMapping("/comic")
    public ResponseEntity<?> getAllComic(
            @RequestParam(value = "searchBy", required = false, defaultValue = "") String searchBy,
            @RequestParam(value = "searchByData", required = false, defaultValue = "") String searchByData,
            @RequestParam(value = "inSearch", required = false, defaultValue = "") String inSearch,
            @RequestParam(value = "sortBy", required = false, defaultValue = "") String sortBy,
            @RequestParam(value = "genre", required = false) List<String> genreCondition,
            @RequestParam(value = "status", required = false) STATUS statusCondition,
            @RequestParam(value = "minChapter", required = false, defaultValue = "0") int minChapter,
            @RequestParam(value = "maxChapter", required = false, defaultValue = "10000") int maxChapter,
            @RequestParam("pageNumber") int pageNumber) {

        // CommonFunction.jsonValidate(ComicController.class, comicFilterReqStr,
        // JsonConstant.JSON_REQ_COMIC_FILTER);
        // ComicFilterReq comicFilterReq =
        // CommonFunction.stringJsonToObject(ComicFilterReq.class, comicFilterReqStr);
        Page<Comic> page = comicService.getAllComic(pageNumber, CommonConstants.COMIC_SIZE, searchBy, searchByData,
                inSearch, sortBy, genreCondition, statusCondition, minChapter, maxChapter);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/comic/{id}")
    public ResponseEntity<?> getComicById(@PathVariable("id") Long id) {
        Comic comic = comicService.getComicById(id);
        return new ResponseEntity<>(comic, HttpStatus.OK);
    }

    @PostMapping(PathConstants.COMMENT_COMIC)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> addCommentComic(@RequestBody String commentComicReqStr,
            @RequestHeader("Authorization") String jwt)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ComicController.class, commentComicReqStr,
                JsonConstant.JSON_REQ_COMMENT_COMIC);
        CommentComicReq commentComicReq = CommonFunction.stringJsonToObject(CommentComicReq.class,
                commentComicReqStr);
        User user = userService.getUserByJwt(jwt);
        CommentComic commentComic = comicService.addCommentComic(user, commentComicReq);
        return new ResponseEntity<>(commentComic, HttpStatus.OK);
    }

    @PostMapping(PathConstants.LIKE + "/{comicId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> addAndRemoveLike(@PathVariable("comicId") Long comicId,
            @RequestHeader("Authorization") String jwt)
            throws JsonMappingException, JsonProcessingException {
        User user = userService.getUserByJwt(jwt);
        comicService.handleLike(user, comicId);
        return new ResponseEntity<>(new ApiResponse("Succussfull"), HttpStatus.OK);
    }

    @PostMapping(PathConstants.FOLLOW + "/{comicId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> addAndRemoveFollow(@PathVariable("comicId") Long comicId,
            @RequestHeader("Authorization") String jwt)
            throws JsonMappingException, JsonProcessingException {
        User user = userService.getUserByJwt(jwt);
        comicService.handleFollow(user, comicId);
        return new ResponseEntity<>(new ApiResponse("Succussfull"), HttpStatus.OK);
    }

    @GetMapping(PathConstants.LIKE)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> likeByUser(@RequestHeader("Authorization") String jwt,
            @RequestParam("pageNumber") int pageNumber) {
        User user = userService.getUserByJwt(jwt);
        Page<Comic> page = comicService.getComicLikeByUser(user, pageNumber);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping(PathConstants.FOLLOW)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> followByUser(@RequestHeader("Authorization") String jwt,
            @RequestParam("pageNumber") int pageNumber) {
        System.out.println("vui");
        User user = userService.getUserByJwt(jwt);

        Page<Comic> page = comicService.getComicFollowByUser(user, pageNumber);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

}
