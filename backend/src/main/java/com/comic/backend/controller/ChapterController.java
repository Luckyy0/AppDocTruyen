package com.comic.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.comic.backend.dto.CommentChapterReq;
import com.comic.backend.dto.Comic.ChapterReq;
import com.comic.backend.dto.User.ApiResponse;
import com.comic.backend.model.CommentChapter;
import com.comic.backend.model.Comic.Chapter;
import com.comic.backend.model.User.User;
import com.comic.backend.service.ComicService;
import com.comic.backend.service.UserService;
import com.comic.backend.utils.CommonFunction;
import com.comic.backend.utils.Constants.JsonConstant;
import com.comic.backend.utils.Constants.PathConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@RequestMapping
public class ChapterController {

    @Autowired
    private ComicService comicService;

    @Autowired
    UserService userService;

    @PostMapping(PathConstants.CHAPTER)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addChapter(@RequestBody String chapterReqStr)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ChapterController.class, chapterReqStr, JsonConstant.JSON_REQ_CHAPTER);
        ChapterReq chapterReq = CommonFunction.stringJsonToObject(ChapterReq.class, chapterReqStr);
        Chapter chapter = comicService.addChapter(chapterReq);
        return new ResponseEntity<>(chapter, HttpStatus.OK);
    }

    @PutMapping(PathConstants.CHAPTER + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateChapter(
            @PathVariable("id") Long id, @RequestBody String chapterReqStr)
            throws JsonMappingException, JsonProcessingException {

        CommonFunction.jsonValidate(ChapterController.class, chapterReqStr, JsonConstant.JSON_REQ_CHAPTER);
        ChapterReq chapterReq = CommonFunction.stringJsonToObject(ChapterReq.class, chapterReqStr);
        Chapter chapter = comicService.updateChapter(chapterReq, id);
        return new ResponseEntity<>(chapter, HttpStatus.OK);
    }

    @DeleteMapping(PathConstants.CHAPTER + "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteChapter(
            @PathVariable("id") Long id) {

        comicService.deleteChapter(id);
        return new ResponseEntity<>(new ApiResponse("Xóa thành công"), HttpStatus.OK);
    }

    @GetMapping("/chapter")
    public ResponseEntity<?> getListChapter(
            @RequestParam(value = "comicId", required = false) Long comicId, @RequestParam("sort") String sort,
            @RequestParam("pagenumber") int pageNumber) throws JsonMappingException, JsonProcessingException {
        Page<Chapter> page = comicService.getListChapter(comicId, sort, pageNumber);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/chapter/{id}")
    public ResponseEntity<?> getChapterContent(@PathVariable("id") Long id)  {
        Chapter chapter = comicService.getChapterById(id);
        return new ResponseEntity<>(chapter, HttpStatus.OK);
    }

    @PostMapping(PathConstants.COMMENT_CHAPTER)
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> addCommentChapter(@RequestBody String commentChapterReqStr,
            @RequestHeader("Authorization") String jwt)
            throws JsonMappingException, JsonProcessingException {
        CommonFunction.jsonValidate(ChapterController.class, commentChapterReqStr,
                JsonConstant.JSON_REQ_COMMENT_CHAPTER);
        CommentChapterReq commentChapterReq = CommonFunction.stringJsonToObject(CommentChapterReq.class,
                commentChapterReqStr);

        User user = userService.getUserByJwt(jwt);
        CommentChapter commentChapter = comicService.addCommentChapter(user, commentChapterReq);
        return new ResponseEntity<>(commentChapter, HttpStatus.OK);
    }

}
