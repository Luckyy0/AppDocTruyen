package com.comic.backend.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import com.comic.backend.exception.CommonException;
import com.comic.backend.model.CommentChapter;
import com.comic.backend.model.CommentComic;
import com.comic.backend.model.FollowComic;
import com.comic.backend.model.LikeComic;
import com.comic.backend.model.ViewComic;
import com.comic.backend.model.Comic.Author;
import com.comic.backend.model.Comic.Chapter;
import com.comic.backend.model.Comic.Comic;
import com.comic.backend.model.Comic.Genre;
import com.comic.backend.model.User.User;
import com.comic.backend.repository.CommentChapterRepository;
import com.comic.backend.repository.CommentComicRepository;
import com.comic.backend.repository.FollowComicRepository;
import com.comic.backend.repository.LikeComicRepository;
import com.comic.backend.repository.ViewComicRepository;
import com.comic.backend.repository.Comic.AuthorRepository;
import com.comic.backend.repository.Comic.ChapterRepository;
import com.comic.backend.repository.Comic.ComicRepository;
import com.comic.backend.repository.Comic.GenreRepository;
import com.comic.backend.utils.Constants.COMIC;
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
    private ViewComicRepository viewComicRepository;

    @Autowired
    private FollowComicRepository followComicRepository;

    @Autowired
    @Lazy
    private UserService userService;

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
    public List<GenreRes> getListGenre(String search) {
        List<Genre> genres =  genreRepository.findAllByName(search, Sort.by("name").ascending());
        return genres.stream().map(genre -> GenreRes.builder().id(genre.getId()).name(genre.getName()).numberComic(genre.getComics().size())
            .view(genre.getComics().stream().mapToLong(comic -> comic.getView()).sum())
            .build()).toList();

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
    public List<AuthorRes> getListAuthor(String search) {
        List<Author> authors = authorRepository.findAllByName(search, Sort.by("name").ascending());
        return authors.stream().map(author -> AuthorRes.builder()
            .id(author.getId())
            .name(author.getName())
            .description(author.getDescription())
            .numberComic(author.getComics().size())
            .view(author.getComics().stream().mapToLong(comic -> comic.getView()).sum())
            .build()).toList();
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
    public Page<ComicRes> getHotComic(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Comic> comics = comicRepository.findHotcomics();
        List<ComicRes> comicRes = comics.stream().map(comic -> ComicRes.builder()
                .id(comic.getId())
                .name(comic.getName())
                .image(comic.getImage())
                .description(comic.getDescription())
                .type(comic.getType())
                .status(comic.getStatus())
                .view(comic.getView())
                .genres(comic.getGenres())
                .author(comic.getAuthor())
                .comment(comic.getComments().size())
                .follow(comicTotalFollow(comic.getId()))
                .like(comicTotalLike(comic.getId()))
                .chap(comicTotalChap(comic.getId()))
                .createAt(comic.getCreateAt())
                .updateAt(comic.getUpdateAt())
                .build()).toList();
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), comicRes.size());
        List<ComicRes> pageContent = comicRes.subList(startIndex, endIndex);
        Page<ComicRes> comicPage = new PageImpl<>(pageContent, pageable, comicRes.size());
        return comicPage;
    }

    @Override
    public Page<ComicRes> getNominatedComic(int pageNumber, int pageSize, User user) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Set<String> authors = new HashSet<>();
        authors.addAll(likeComicRepository.getAuthorByUserId(user.getId()));
        authors.addAll(followComicRepository.getAuthorByUserId(user.getId()));
        authors.addAll(viewComicRepository.getAuthorByUserId(user.getId()));
        // authors.stream().forEach(System.out::println);
        Set<String> genres = new HashSet<>();
        genres.addAll(viewComicRepository.getGenreByUserId(user.getId()));
        genres.addAll(followComicRepository.getGenreByUserId(user.getId()));
        genres.addAll(likeComicRepository.getGenreByUserId(user.getId()));
        // genres.stream().forEach(System.out::println);
        List<Comic> comics = new ArrayList<>();
        if (authors.size() == 0 && genres.size() == 0) {
            comics = comicRepository.findAll();
        } else {
            comics = comicRepository.findNominatedcomics(authors, genres);
        }
        List<ComicRes> comicRes = comics.stream().map(comic -> ComicRes.builder()
                .id(comic.getId())
                .name(comic.getName())
                .image(comic.getImage())
                .description(comic.getDescription())
                .type(comic.getType())
                .status(comic.getStatus())
                .view(comic.getView())
                .genres(comic.getGenres())
                .author(comic.getAuthor())
                .comment(comic.getComments().size())
                .follow(comicTotalFollow(comic.getId()))
                .like(comicTotalLike(comic.getId()))
                .chap(comicTotalChap(comic.getId()))
                .createAt(comic.getCreateAt())
                .updateAt(comic.getUpdateAt())
                .build()).toList();

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), comicRes.size());
        List<ComicRes> pageContent = comicRes.subList(startIndex, endIndex);
        Page<ComicRes> comicPage = new PageImpl<>(pageContent, pageable, comicRes.size());
        return comicPage;
    }

    @Override
    public Page<ComicRes> getAllComic(int pageNumber, int pageSize, String searchBy, String searchByData,
            String inSearch,
            String sortBy, List<String> genreCondition, STATUS statusCondition, int minChapter, int maxChapter,
            COMIC typeComic) {
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
            } else {
                comics = comicRepository.findByUserSearch(inSearch, sortBy, genreCondition, statusCondition, minChapter,
                        maxChapter, typeComic);
            }
        }
        List<ComicRes> comicRes = comics.stream().map(comic -> ComicRes.builder()
                .id(comic.getId())
                .name(comic.getName())
                .image(comic.getImage())
                .description(comic.getDescription())
                .type(comic.getType())
                .status(comic.getStatus())
                .view(comic.getView())
                .genres(comic.getGenres())
                .author(comic.getAuthor())
                .comment(comic.getComments().size())
                .follow(comicTotalFollow(comic.getId()))
                .like(comicTotalLike(comic.getId()))
                .chap(comicTotalChap(comic.getId()))
                .createAt(comic.getCreateAt())
                .updateAt(comic.getUpdateAt())
                .build()).toList();
        // get chỉ số bắt đầu của element trong pageNumber
        int startIndex = (int) pageable.getOffset();
        // get chỉ số cuối của element trong pageNumber
        int endIndex = Math.min(startIndex + pageable.getPageSize(), comicRes.size());
        // Lấy các element từ [startIndex,endIndex)
        List<ComicRes> pageContent = comicRes.subList(startIndex, endIndex);

        // Thiết lập trang
        Page<ComicRes> comicPage = new PageImpl<>(pageContent, pageable, comicRes.size());
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
                        .comicId(item.getComic().getId())
                        .comicName(item.getComic().getName())
                        .image(item.getComic().getImage())
                        .genres(item.getComic().getGenres())
                        .author(item.getComic().getAuthor().getName())
                        .comicType(item.getComic().getType().name())
                        .createAt(item.getCreateAt())
                        .updateAt(item.getUpdateAt())
                        .minute(Duration.between(item.getCreateAt(), LocalDateTime.now()).toMinutes())
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
                        .comicId(item.getComic().getId())
                        .comicName(item.getComic().getName())
                        .image(item.getComic().getImage())
                        .genres(item.getComic().getGenres())
                        .author(item.getComic().getAuthor().getName())
                        .comicType(item.getComic().getType().name())
                        .createAt(item.getCreateAt())
                        .updateAt(item.getUpdateAt())
                        .minute(Duration.between(item.getCreateAt(), LocalDateTime.now()).toMinutes())
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
    public ChapterRes getChapterById(Long id) {
        Chapter chapter = checkChapterExist(id);
        return ChapterRes.builder()
                .chapId(chapter.getId())
                .chapNumber(chapter.getChapNumber())
                .title(chapter.getTitle())
                .content(chapter.getContent())
                .comicId(chapter.getComic().getId())
                .comicName(chapter.getComic().getName())
                .image(chapter.getComic().getImage())
                .genres(chapter.getComic().getGenres())
                .author(chapter.getComic().getAuthor().getName())
                .comicType(chapter.getComic().getType().name())
                .createAt(chapter.getCreateAt())
                .updateAt(chapter.getUpdateAt())
                .minute(Duration.between(chapter.getCreateAt(), LocalDateTime.now()).toMinutes())
                .build();
    }

    @Override
    public ChapterRes getChapterFromFreeComicById(Long comicId, Long chapterId) {
        Comic comic = checkComicExist(comicId);
        if (comic.getType().toString().equals(COMIC.PAID.toString()))
            throw new CommonException("Vui lòng đăng nhập để đọc truyện");
        ChapterRes chapterRes = getChapterById(chapterId);
        if (comicId == chapterRes.getComicId())
            return chapterRes;
        throw new CommonException("Chapter không nằm trong truyện muốn đọc");
    }

    @Override
    public ChapterRes getChapterFromPaidComicById(Long comicId, Long chapterId, User user) {
        boolean check = userService.checkUserVip(user);
        if (!check)
            throw new CommonException("Vui lòng mua gói thành viên để có thể đọc toàn bộ truyện");
        ChapterRes chapterRes = getChapterById(chapterId);
        if (comicId == chapterRes.getComicId())
            return chapterRes;
        throw new CommonException("Chapter không nằm trong truyện muốn đọc");
    }

    @Override
    public ComicRes getComicById(Long id) {
        Comic comic = checkComicExist(id);
        return ComicRes.builder()
                .id(comic.getId())
                .name(comic.getName())
                .image(comic.getImage())
                .description(comic.getDescription())
                .type(comic.getType())
                .status(comic.getStatus())
                .view(comic.getView())
                .genres(comic.getGenres())
                .author(comic.getAuthor())
                .comment(comic.getComments().size())
                .follow(comicTotalFollow(id))
                .like(comicTotalLike(id))
                .chap(comicTotalChap(id))
                .createAt(comic.getCreateAt())
                .updateAt(comic.getUpdateAt())
                .build();
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

    public Long comicTotalLike(Long comicId) {
        Long total = likeComicRepository.getTotalLike(comicId);
        return total;
    }

    public Long comicTotalFollow(Long comicId) {
        Long total = followComicRepository.getTotalFollow(comicId);
        return total;
    }

    public Long comicTotalChap(Long comicId) {
        Long total = chapterRepository.getTotalChap(comicId);
        return total;
    }

    @Override
    public List<CommentComic> getAllCommentComic(Long id) {
        List<CommentComic> commentComics = commentComicRepository.findAllByComicId(id,
                Sort.by("createAt").descending());
        return commentComics;
    }

    @Override
    public List<CommentChapter> getAllCommentChapter(Long id) {
        List<CommentChapter> commentChapters = commentChapterRepository.findAllByChapterId(id,
                Sort.by("createAt").descending());
        return commentChapters;
    }

    @Override
    public CheckRes checkLike(User user, Long comicId) {
        CheckRes checkRes = new CheckRes();
        checkComicExist(comicId);
        Optional<LikeComic> opt = likeComicRepository.findByComicAndUser(user.getId(), comicId);
        if (opt.isPresent()) {
            checkRes.setStatus(true);
        } else {
            checkRes.setStatus(false);
        }
        return checkRes;
    }

    @Override
    public CheckRes checkFollow(User user, Long comicId) {
        CheckRes checkRes = new CheckRes();
        checkComicExist(comicId);
        Optional<FollowComic> opt = followComicRepository.findByComicAndUser(user.getId(), comicId);
        if (opt.isPresent()) {
            checkRes.setStatus(true);
        } else {
            checkRes.setStatus(false);
        }
        return checkRes;
    }

    @Override
    public void handleDeleteView(User user, Long comicId) {
        checkComicExist(comicId);
        Optional<ViewComic> opt = viewComicRepository.findByComicAndUser(user.getId(), comicId);
        if (opt.isPresent()) {
            viewComicRepository.delete(opt.get());
        }
    }

    @Override
    public void handleAddView(User user, Long comicId, AddViewReq addViewReq) {
        Comic comic = checkComicExist(comicId);
        Optional<ViewComic> opt = viewComicRepository.findByComicAndUser(user.getId(), comicId);
        ChapterRes chapter = getChapterById(addViewReq.getChapId());
        if (opt.isPresent()) {
            ViewComic viewComic = opt.get();
            viewComic.setChapId(addViewReq.getChapId());
            viewComic.setChapNumber(chapter.getChapNumber());
            viewComic.setChapTitle(chapter.getTitle());
            viewComic.setUpdateAt(LocalDateTime.now());
            viewComicRepository.save(viewComic);
            return;
        }
        ViewComic viewComic = ViewComic.builder().comic(comic).user(user).chapId(addViewReq.getChapId())
                .chapNumber(chapter.getChapNumber()).chapTitle(chapter.getTitle()).build();
        viewComicRepository.save(viewComic);
        return;

    }

    @Override
    public ChapterRes getChapterIsReading(User user, Long comicId) {
        checkComicExist(comicId);
        Optional<ViewComic> opt = viewComicRepository.findByComicAndUser(user.getId(), comicId);
        if (opt.isPresent()) {
            ViewComic viewComic = opt.get();
            ChapterRes chapter = getChapterById(viewComic.getChapId());
            return chapter;

        }
        throw new CommonException("Chưa có dữ liệu");

    }

    @Override
    public void addViewComicOnClick(Long id) {
        Comic comic = checkComicExist(id);
        comic.setView(comic.getView() + 1);
        comicRepository.save(comic);
    }

}