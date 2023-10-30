import { Link } from "react-router-dom";
import styles from "./ComicInfo.module.scss";
import classNames from "classnames/bind";
import { Genre, Tag } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListUl,
    faBook,
    faHeart,
    faThumbsUp,
    faCircleInfo,
    faCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Label from "../../../components/label";
const cx = classNames.bind(styles);

function ComicInfo() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-1")}>
                <Link to={"/"}>Trang chủ</Link>
                <p>&nbsp; /&nbsp;</p>
                <Link to={"/book"}>Comic name</Link>
            </div>
            <div className={cx("content-2")}>
                <img
                    className={cx("image")}
                    src="https://fonos.vn/_next/image?url=https%3A%2F%2Fcdn.fonos.dev%2Fbooks%2F8bdf0080-5ec5-11ee-8e66-3fa49a269144%2FcoverImage%2F1695991304330_3x.webp&w=1920&q=75"
                    alt="img"
                />
            </div>
            <div className={cx("content-3")}>
                <p>Comic Name</p>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Tác giả</p>
                    <p className={cx("e_2")}>Thanh tử</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Tình trạng</p>
                    <p className={cx("e_2")}>Đang cập nhật</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Lượt thích</p>
                    <p className={cx("e_2")}>12 000</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Lượt theo dõi</p>
                    <p className={cx("e_2")}>33 647</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Lượt xem</p>
                    <p className={cx("e_2")}>26 000 000</p>
                </div>
            </div>
            <div className={cx("content-4")}>
                <Genre name="Kiếm hiệp" />
                <Genre name="Huyễn huyền" />
                <Genre name="Kinh dị" />
                <Genre name="Viễn tưởng" />
            </div>
            <div className={cx("content-5")}>
                <Tag
                    name="Đọc từ đầu"
                    icon={<FontAwesomeIcon icon={faBook} />}
                />
                <Tag
                    name="Theo dõi"
                    icon={<FontAwesomeIcon icon={faHeart} />}
                />
                <Tag
                    name="Thích"
                    icon={<FontAwesomeIcon icon={faThumbsUp} />}
                />
                <Tag
                    name="Đọc tiếp"
                    icon={<FontAwesomeIcon icon={faCircleRight} />}
                />
            </div>
            <div className={cx("content-6")}>
                <Label
                    name="Thông tin mô tả"
                    icon={<FontAwesomeIcon icon={faCircleInfo} />}
                />
                <p className={cx("info")}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero dolore mollitia praesentium veniam ab pariatur quae,
                    voluptatem, doloribus rem atque, consequuntur eveniet
                    officiis fuga ex adipisci unde in reprehenderit numquam.
                </p>
            </div>

            <div className={cx("content-7")}>
                <Label
                    name="Danh sách chương"
                    icon={<FontAwesomeIcon icon={faListUl} />}
                />
                <div className={cx("list_chapter")}>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                    <Link className={cx("list_chapter-item")} to={"/book/chap"}>
                        <p className={cx("chapter_name")}>Chương 725</p>
                        <p className={cx("chapter_date")}>16/10/2023</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ComicInfo;
