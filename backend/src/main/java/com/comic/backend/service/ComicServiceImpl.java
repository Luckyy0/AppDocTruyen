package com.comic.backend.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.comic.backend.dto.CommentChapterReq;
import com.comic.backend.dto.CommentComicReq;
import com.comic.backend.dto.Comic.AuthorReq;
import com.comic.backend.dto.Comic.ChapterReq;
import com.comic.backend.dto.Comic.ChapterRes;
import com.comic.backend.dto.Comic.ComicReq;
import com.comic.backend.dto.Comic.GenreReq;
import com.comic.backend.exception.CommonException;
import com.comic.backend.model.CommentChapter;
import com.comic.backend.model.CommentComic;
import com.comic.backend.model.FollowComic;
import com.comic.backend.model.LikeComic;
import com.comic.backend.model.Comic.Author;
import com.comic.backend.model.Comic.Chapter;
import com.comic.backend.model.Comic.Comic;
import com.comic.backend.model.Comic.Genre;
import com.comic.backend.model.User.User;
import com.comic.backend.repository.CommentChapterRepository;
import com.comic.backend.repository.CommentComicRepository;
import com.comic.backend.repository.FollowComicRepository;
import com.comic.backend.repository.LikeComicRepository;
import com.comic.backend.repository.Comic.AuthorRepository;
import com.comic.backend.repository.Comic.ChapterRepository;
import com.comic.backend.repository.Comic.ComicRepository;
import com.comic.backend.repository.Comic.GenreRepository;
import com.comic.backend.utils.Constants.CommonConstants;
import com.comic.backend.utils.Constants.STATUS;

@Service
public class ComicServiceImpl implements ComicService {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private CommentChapterRepository commentChapterRepository;

    @Autowired
    private CommentComicRepository commentComicRepository;

    @Autowired
    private LikeComicRepository likeComicRepository;

    @Autowired
    private FollowComicRepository followComicRepository;

    @Autowired
    ComicRepository comicRepository;

    @Override
    public Genre addGenre(GenreReq genreReq) {
        Genre gen = findGenreByName(genreReq.getName());
        if (gen != null)
            throw new CommonException("Genre exist");
        Genre genre = Genre.builder().name(genreReq.getName()).build();
        Genre created = genreRepository.save(genre);
        return created;
    }

    @Override
    public List<Genre> getListGenre(String search) {
        return genreRepository.findAllByName(search, Sort.by("name").ascending());
    }

    @Override
    public void deleteGenre(Long id) {
        Optional<Genre> opt = genreRepository.findById(id);
        if (opt.isPresent())
            genreRepository.delete(opt.get());
        else
            throw new CommonException("Genre not exist");
    }

    @Override
    public Genre findGenreByName(String name) {
        Optional<Genre> opt = genreRepository.findByName(name);
        if (opt.isPresent())
            return opt.get();
        return null;
    }

    @Override
    public Genre updateGenre(Long id, GenreReq genreReq) {
        Genre gen = findGenreByName(genreReq.getName());
        if (gen != null)
            throw new CommonException("Tên thể loại thay đổi trên request đã tồn tại trong cơ sở dữ liệu");

        Optional<Genre> opt = genreRepository.findById(id);
        if (opt.isPresent()) {
            Genre genre = opt.get();
            genre.setName(genreReq.getName());
            return genreRepository.save(genre);
        } else
            throw new CommonException("Genre not exist with id");
    }

    @Override
    public Author addAuthor(AuthorReq authorReq) {
        Author auth = findAuthorByName(authorReq.getName());
        System.out.println("d");
        if (auth != null)
            throw new CommonException("Author exist");
        Author author = Author.builder().name(authorReq.getName()).description(authorReq.getDescription()).build();
        Author created = authorRepository.save(author);
        return created;
    }

    @Override
    public List<Author> getListAuthor(String search) {
        return authorRepository.findAllByName(search, Sort.by("name").ascending());
    }

    @Override
    public void deleteAuthor(Long id) {
        Optional<Author> opt = authorRepository.findById(id);
        if (opt.isPresent())
            authorRepository.delete(opt.get());
        else
            throw new CommonException("Author not exist");
    }

    @Override
    public Author updateAuthor(Long id, AuthorReq authorReq) {
        Optional<Author> opt = authorRepository.findById(id);
        if (opt.isPresent()) {
            Author author = opt.get();
            author.setName(authorReq.getName());
            author.setDescription(authorReq.getDescription());
            return authorRepository.save(author);
        } else
            throw new CommonException("Author not exist with id");
    }

    @Override
    public Author findAuthorByName(String name) {
        System.out.println("d");
        Optional<Author> opt = authorRepository.findByName(name);

        if (opt.isPresent())
            return opt.get();
        return null;
    }

    @Override
    public Comic addComic(ComicReq comicReq) {
        Author author = checkAuthorExist(comicReq.getAuthor_id());

        Comic comic = Comic.builder()
                .name(comicReq.getName())
                .image(comicReq.getImage())
                .author(author)
                .description(comicReq.getDescription())
                .type(comicReq.getType())
                .genres(comicReq.getGenres().stream().map(id -> checkGenreExist(id)).toList())
                .build();
        Comic created = comicRepository.save(comic);
        return created;
    }

    private Author checkAuthorExist(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new CommonException("Author is not exist"));
    }

    private Comic checkComicExist(Long id) {
        return comicRepository.findById(id)
                .orElseThrow(() -> new CommonException("Comic with id not exist"));
    }

    private Genre checkGenreExist(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new CommonException("Genre with " + id + " is not exist"));
    }

    private Chapter checkChapterExist(Long id) {
        return chapterRepository.findById(id)
                .orElseThrow(() -> new CommonException("Chapter with " + id + " is not exist"));
    }

    @Override
    public Comic updateComic(ComicReq comicReq, long id) {

        Comic comic = checkComicExist(id);
        Author author = checkAuthorExist(comicReq.getAuthor_id());

        comic.setName(comicReq.getName());
        comic.setImage(comicReq.getImage());
        comic.setAuthor(author);
        comic.setDescription(comicReq.getDescription());
        comic.setType(comicReq.getType());
        comic.getGenres().clear();
        comic.getGenres().addAll(comicReq.getGenres().stream().map(idx -> checkGenreExist(idx)).toList());
        comic.setUpdateAt(LocalDateTime.now());
        return comicRepository.save(comic);
    }

    @Override
    public void deleteComic(long id) {
        Optional<Comic> opt = comicRepository.findById(id);
        if (opt.isPresent())
            comicRepository.delete(opt.get());
        else
            throw new CommonException("comic not exist");
    }

    @Override
    public Page<Comic> getAllComic(int pageNumber, int pageSize, String searchBy, String searchByData, String inSearch, String sortBy, List<String> genreCondition, STATUS statusCondition, int minChapter, int maxChapter) {
        // Pageable chứa thông tin về số trang, kích thước trang và sắp xếp
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        // get data from database
        List<Comic> comics;
        if (searchBy.equals("id")) {
            try {
                int data = Integer.parseInt(searchByData);
                comics = comicRepository.findAllById(data);
            } catch (Exception e) {
                comics = comicRepository.findAllById(0);
            }
        } else {
            if (!searchBy.equals(String.valueOf(""))) {
                comics = comicRepository.findAllWithFilter(searchBy, searchByData);
            }else{
                comics= comicRepository.findByUserSearch(inSearch,sortBy, genreCondition,statusCondition,minChapter,maxChapter);
            }
        }
        // get chỉ số bắt đầu của element trong pageNumber
        int startIndex = (int) pageable.getOffset();
        // get chỉ số cuối của element trong pageNumber
        int endIndex = Math.min(startIndex + pageable.getPageSize(), comics.size());
        // Lấy các element từ [startIndex,endIndex)
        List<Comic> pageContent = comics.subList(startIndex, endIndex);

        // Thiết lập trang
        Page<Comic> comicPage = new PageImpl<>(pageContent, pageable, comics.size());
        return comicPage;
    }

    @Override
    public Chapter addChapter(ChapterReq chapterReq) {
        Comic comic = checkComicExist(chapterReq.getComicId());

        Chapter chapter = Chapter.builder()
                .chapNumber(chapterReq.getChapNumber())
                .title(chapterReq.getTitle())
                .content(chapterReq.getContent())
                .comic(comic)
                .build();

        return chapterRepository.save(chapter);
    }

    @Override
    public Chapter updateChapter(ChapterReq chapterReq, Long id) {
        Chapter chapter = checkChapterExist(id);

        chapter.setChapNumber(chapterReq.getChapNumber());
        chapter.setTitle(chapterReq.getTitle());
        chapter.setContent(chapterReq.getContent());
        chapter.setUpdateAt(LocalDateTime.now());
        if (chapterReq.getComicId() != null) {
            chapter.setComic(comicRepository.findById(chapterReq.getComicId())
                    .orElseThrow(() -> new CommonException("Comic wiith id is not exist")));
        }

        return chapterRepository.save(chapter);
    }

    @Override
    public void deleteChapter(Long id) {
        Optional<Chapter> opt = chapterRepository.findById(id);
        if (opt.isPresent())
            chapterRepository.delete(opt.get());
        else
            throw new CommonException("chapter not exist");
    }

    @Override
    public Page<ChapterRes> getListChapter(Long comicId, String sort, int pageNumber) {
        // Pageable chứa thông tin về số trang, kích thước trang và sắp xếp
        Pageable pageable = PageRequest.of(pageNumber, CommonConstants.CHAPTER_SIZE);

        Sort sort2;
        switch (sort) {
            case "DESC":
                sort2 = Sort.by("createAt").descending();
                break;
            case "ASC":
                sort2 = Sort.by("createAt").ascending();
                break;
            default:
                throw new CommonException("Case error");
        }
        List<Chapter> chapters;
        if (comicId == null) {
            chapters = chapterRepository.findAll(sort2);
        } else {
            chapters = chapterRepository.findAllByComicId(sort2, comicId);
        }
        List<ChapterRes> chapterRes = chapters.stream()
                .map(item -> ChapterRes.builder()
                        .chapId(item.getId())
                        .chapNumber(item.getChapNumber())
                        .title(item.getTitle())
                        .comicName(item.getComic().getName())
                        .genre(item.getComic().getGenres().get(0).getName())
                        .author(item.getComic().getAuthor().getName())
                        .comicType(item.getComic().getType().name())
                        .createAt(item.getCreateAt())
                        .updateAt(item.getUpdateAt())
                        .minute(Duration.between(item.getCreateAt(),LocalDateTime.now()).toMinutes())
                        .build())
                .toList();

        // get chỉ số bắt đầu của element trong pageNumber
        int startIndex = (int) pageable.getOffset();
        // get chỉ số cuối của element trong pageNumber
        int endIndex = Math.min(startIndex + pageable.getPageSize(), chapters.size());
        // Lấy các element từ [startIndex,endIndex)
        List<ChapterRes> pageContent = chapterRes.subList(startIndex, endIndex);

        // Thiết lập trang
        Page<ChapterRes> chapterPage = new PageImpl<>(pageContent, pageable, chapterRes.size());
        return chapterPage;
    }

    @Override
    public List<ChapterRes> getAllChapter(Long comicId) {
        List<Chapter> chapters = chapterRepository.findAllByComicId(Sort.by("chapNumber").descending(), comicId);
        List<ChapterRes> chapterRes = chapters.stream()
                .map(item -> ChapterRes.builder()
                        .chapId(item.getId())
                        .chapNumber(item.getChapNumber())
                        .title(item.getTitle())
                        .createAt(item.getCreateAt())
                        .updateAt(item.getUpdateAt())
                        .build())
                .toList();
        return chapterRes;
    }

    @Override
    public CommentChapter addCommentChapter(User user, CommentChapterReq commentChapterReq) {
        Chapter chapter = checkChapterExist(commentChapterReq.getChapterId());
        CommentChapter commentChapter = CommentChapter.builder().user(user).chapter(chapter)
                .content(commentChapterReq.getContent()).build();
        return commentChapterRepository.save(commentChapter);
    }

    @Override
    public Chapter getChapterById(Long id) {
        return checkChapterExist(id);
    }

    @Override
    public Comic getComicById(Long id) {
        return checkComicExist(id);
    }

    @Override
    public CommentComic addCommentComic(User user, CommentComicReq commentComicReq) {
        Comic comic = checkComicExist(commentComicReq.getComicId());
        CommentComic commentComic = CommentComic.builder().user(user).comic(comic).content(commentComicReq.getContent())
                .build();
        return commentComicRepository.save(commentComic);
    }

    @Override
    public void handleLike(User user, Long comicId) {
        Comic comic = checkComicExist(comicId);
        Optional<LikeComic> opt = likeComicRepository.findByComicAndUser(user.getId(), comicId);
        if (opt.isPresent()) {
            likeComicRepository.delete(opt.get());
            return;
        }
        LikeComic likeComic = LikeComic.builder().comic(comic).user(user).build();
        likeComicRepository.save(likeComic);
        return;
    }

    @Override
    public void handleFollow(User user, Long comicId) {
        Comic comic = checkComicExist(comicId);
        Optional<FollowComic> opt = followComicRepository.findByComicAndUser(user.getId(), comicId);
        if (opt.isPresent()) {
            followComicRepository.delete(opt.get());
            return;
        }
        FollowComic followComic = FollowComic.builder().comic(comic).user(user).build();
        followComicRepository.save(followComic);
        return;
    }

    @Override
    public Page<Comic> getComicFollowByUser(User user, int pageNumber) {

        // Pageable chứa thông tin về số trang, kích thước trang và sắp xếp
        Pageable pageable = PageRequest.of(pageNumber, CommonConstants.FOLLOW_AND_LIKE_SIZE);

        List<Comic> comics = followComicRepository.getComicByUserFollow(user.getId());

        // get chỉ số bắt đầu của element trong pageNumber
        int startIndex = (int) pageable.getOffset();
        // get chỉ số cuối của element trong pageNumber
        int endIndex = Math.min(startIndex + pageable.getPageSize(), comics.size());
        // Lấy các element từ [startIndex,endIndex)
        List<Comic> pageContent = comics.subList(startIndex, endIndex);

        // Thiết lập trang
        Page<Comic> followPage = new PageImpl<>(pageContent, pageable, comics.size());

        return followPage;
    }

    @Override
    public Page<Comic> getComicLikeByUser(User user, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, CommonConstants.FOLLOW_AND_LIKE_SIZE);
        List<Comic> likeComics = likeComicRepository.getComicByUserLike(user.getId());
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), likeComics.size());
        List<Comic> pageContent = likeComics.subList(startIndex, endIndex);
        Page<Comic> likePage = new PageImpl<>(pageContent, pageable, likeComics.size());
        return likePage;
    }

    private Long comicTotalLike(Long comicId) {
        Long total = likeComicRepository.getTotalLike(comicId);
        return total;
    }

    private Long comicTotalFollow(Long comicId) {
        Long total = followComicRepository.getTotalFollow(comicId);
        return total;
    }

    

}