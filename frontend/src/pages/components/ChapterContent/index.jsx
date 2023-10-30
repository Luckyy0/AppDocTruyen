import { Link } from "react-router-dom";
import styles from "./ChapterContent.module.scss";
import classNames from "classnames/bind";
import { Genre, Tag } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListUl,
    faArrowRight,
    faSortDown,
    faArrowLeftLong,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Label from "../../../components/label";
import LastTag from "../../../components/LastTag";
const cx = classNames.bind(styles);

function ChapterContent() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-1")}>
                <Link to={"/"}>Trang chủ</Link>
                <p>&nbsp; /&nbsp;</p>
                <Link to={"/book"}>Comic name</Link>
                <p>&nbsp; /&nbsp;</p>
                <Link to={"/book/chap"}>chap</Link>
            </div>
            <div className={cx("content-2")}>
                <p className={cx("e_1")}>Chương 1</p>
                <p className={cx("e_2")}>Khởi đầu của sự diệt vong</p>
            </div>
            <div className={cx("content-3")}>
                <Genre name="Kiếm hiệp" />
                <Genre name="Huyễn huyền" />
                <Genre name="Kinh dị" />
                <Genre name="Viễn tưởng" />
            </div>
            <div className={cx("content-4")}>
                <Tag
                    name="Chương trước"
                    icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                />
                <div className={cx("list_chap")}>
                    <Tag
                        name="Danh sách chương"
                        icon={<FontAwesomeIcon icon={faListUl} />}
                    />
                    <div className={cx("list_chapter")}>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                    </div>
                </div>

                <LastTag
                    name="Chương sau"
                    icon={<FontAwesomeIcon icon={faArrowRight} />}
                />
            </div>
            <div className={cx("content-5")}>
                <p className={cx("main_chap")}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero dolore mollitia praesentium veniam ab pariatur quae,
                    voluptatem, doloribus rem atque, consequuntur eveniet
                    officiis fuga ex adipisci unde in reprehenderit numquam.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                    accusamus repudiandae earum explicabo at ratione? Ab,
                    nesciunt. Temporibus cumque aliquam tempora eos impedit
                    dolorem necessitatibus totam consectetur reprehenderit,
                    incidunt non.
                </p>
            </div>
            <div className={cx("content-4")}>
                <Tag
                    name="Chương trước"
                    icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                />
                <div className={cx("list_chap")}>
                    <Tag
                        name="Danh sách chương"
                        icon={<FontAwesomeIcon icon={faListUl} />}
                    />
                    <div className={cx("list_chapter")}>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                        <Link
                            className={cx("list_chapter-item")}
                            to={"/book/chap"}
                        >
                            <p className={cx("chapter_name")}>Chương 725</p>
                        </Link>
                    </div>
                </div>

                <LastTag
                    name="Chương sau"
                    icon={<FontAwesomeIcon icon={faArrowRight} />}
                />
            </div>
        </div>
    );
}

export default ChapterContent;
