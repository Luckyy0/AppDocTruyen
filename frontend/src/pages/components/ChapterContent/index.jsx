import {
    faArrowLeftLong,
    faArrowRight,
    faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Genre, Tag } from "../../../components";
import LastTag from "../../../components/LastTag";
import useGetAllChapterById from "../../../hook/useGetAllChapterBy";
import { handleAddView, handleAddViewOnClick } from "../../../utils/CommonFunction";
import styles from "./ChapterContent.module.scss";
import { useEffect } from "react";
const cx = classNames.bind(styles);

function ChapterContent({ bookId, item, custom }) {
    const { chapters } = useGetAllChapterById(bookId);
    const navigate = useNavigate();
    const content = item?.content?.replace(/\n/g, "<br/>");

    // add View
    useEffect(() => {
        let currentScrollLength = 0;
        let currentPageHeight = 0;

        let timeStart = new Date();
        const handleScroll = () => {
            // Lấy độ dài trang đã cuộn
            currentScrollLength =
                window.scrollY || document.documentElement.scrollTop;
        };
        window.addEventListener("scroll", handleScroll);
        const getPageHeight = () => {
            // Lấy chiều cao của cửa sổ trình duyệt
            const windowHeight = window.innerHeight;
            // Lấy chiều cao của nội dung trang
            const bodyHeight = document.body.scrollHeight;
            // Chiều cao cuối cùng của trang sẽ là chiều cao lớn nhất giữa chiều cao cửa sổ và chiều cao nội dung
            currentPageHeight = Math.max(windowHeight, bodyHeight);
        };

        window.addEventListener("resize", getPageHeight);
        const intervalAddView = setInterval(() => {
            getPageHeight();
            //**Xác định số từ trong chuỗi**/
            // NFD: chuyển đổi ký tự có dấu thành ký tự + dấu và thay thế các ký tự có mã trong đoạn(dấu) -> ''
            const contentLength = item.content
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9_*]+/g, " ")
                .split(/\s+/).length;
            let scrollCondition = Math.floor(
                (currentScrollLength / currentPageHeight) * 100
            );
            let timeCondition =
                contentLength / Math.floor((new Date() - timeStart) / 1000);
            console.log("-------------log--------------");
            console.log("Tổng số từ: " + contentLength);
            console.log("Độ dài trang: " + currentPageHeight);
            console.log("Khoảng đã cuộn " + currentScrollLength);
            console.log(
                "Thời gian tuy cập: " +
                    Math.floor((new Date() - timeStart) / 1000) +
                    " giây"
            );
            console.log("*******Điều kiện cần đạt*********");
            console.log("Cuộn 40% trang, % đã cuộn : " + scrollCondition + "%");
            console.log(
                "Read time: cần đọc 40% nd / tốc độ 10 word/s => cần đạt , tốc độ cần đạt: 25 w/s"
            );
            console.log(
                "Tốc độ đọc nd dựa trên thời gian truy cập: " +
                    timeCondition +
                    " w/s"
            );
            console.log("--------------End----------------");
            console.log("                                 ");
            if (scrollCondition > 40 && timeCondition <= 25) {
                console.log("Add View");
                handleAddViewOnClick(bookId);
                clearInterval(intervalAddView);
            }
        }, 3000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", getPageHeight);
            clearInterval(intervalAddView);
        };
    }, [bookId, item]);

    const handleReadingPre = () => {
        const chapter =
            chapters[chapters.findIndex((it) => it.chapId === item.chapId) + 1];
        navigate("/book/" + bookId + "/chap/" + chapter.chapId);
        handleAddView(bookId, chapter.chapId, chapter);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
    const handleReadingLast = () => {
        const chapter =
            chapters[chapters.findIndex((it) => it.chapId === item.chapId) - 1];
        navigate("/book/" + bookId + "/chap/" + chapter.chapId);
        handleAddView(bookId, chapter.chapId, chapter);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={cx("wrapper")}
            style={{
                backgroundColor: custom.bg,
                color: custom.txt,
                fontFamily: custom.font,
                fontSize: custom.txtSize + "px",
                lineHeight: custom.lineHeight,
            }}
        >
            <div className={cx("content-1")}>
                <Link to={"/"}>Trang chủ</Link>
                <p>&nbsp; /&nbsp;</p>
                <Link to={"/book/" + bookId}>{item.comicName}</Link>
                <p>&nbsp; /&nbsp;</p>
                <Link to={"/book/" + bookId + "/chap/" + item.chapId}>
                    {"chapter " + item.chapNumber}
                </Link>
            </div>
            <div className={cx("content-2")}>
                <p className={cx("e_1")}>Chương {item.chapNumber}</p>
                <p className={cx("e_2")}>{item.title}</p>
            </div>
            <div className={cx("content-3")}>
                {item.genres.map((it) => (
                    <Genre key={it.id} name={it.name} />
                ))}
            </div>
            <div className={cx("content-4")}>
                <Tag
                    name="Chương trước"
                    icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                    isDisable={
                        chapters[chapters.length - 1]?.chapId === item.chapId
                    }
                    onClick={handleReadingPre}
                    bgd="rgb(240, 12, 118)"
                />
                <div className={cx("list_chap")}>
                    <Tag
                        name="Danh sách chương"
                        icon={<FontAwesomeIcon icon={faListUl} />}
                        bgd="rgb(202, 17, 202)"
                    />
                    <div className={cx("list_chapter")}>
                        {chapters.map((it) => (
                            <Link
                                key={it.chapId}
                                className={cx("list_chapter-item")}
                                to={"/book/" + bookId + "/chap/" + it.chapId}
                                onClick={() => {
                                    handleAddView(bookId, it.chapId, it);
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                <p className={cx("chapter_name")}>
                                    Chương {it.chapNumber}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                <LastTag
                    name="Chương sau"
                    icon={<FontAwesomeIcon icon={faArrowRight} />}
                    isDisable={chapters[0]?.chapId === item.chapId}
                    onClick={handleReadingLast}
                    bgd="rgb(77, 34, 231)"
                />
            </div>
            <div className={cx("content-5")}>
                <div
                    className={cx("main_chap")}
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>

            <div className={cx("content-4")}>
                <Tag
                    name="Chương trước"
                    icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                    isDisable={
                        chapters[chapters.length - 1]?.chapId === item.chapId
                    }
                    onClick={handleReadingPre}
                    bgd="rgb(240, 12, 118)"
                />
                <div className={cx("list_chap")}>
                    <Tag
                        name="Danh sách chương"
                        icon={<FontAwesomeIcon icon={faListUl} />}
                        bgd="rgb(202, 17, 202)"
                    />
                    <div className={cx("list_chapter")}>
                        {chapters.map((it) => (
                            <Link
                                key={it.chapId}
                                className={cx("list_chapter-item")}
                                to={"/book/" + bookId + "/chap/" + it.chapId}
                                onClick={() => {
                                    handleAddView(bookId, it.chapId, it);
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                <p className={cx("chapter_name")}>
                                    Chương {it.chapNumber}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                <LastTag
                    name="Chương sau"
                    icon={<FontAwesomeIcon icon={faArrowRight} />}
                    isDisable={chapters[0]?.chapId === item.chapId}
                    onClick={handleReadingLast}
                    bgd="rgb(77, 34, 231)"
                />
            </div>
        </div>
    );
}

export default ChapterContent;
