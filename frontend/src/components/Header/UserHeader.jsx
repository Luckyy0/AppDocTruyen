import styles from "./userHeader.module.scss";
import classNames from "classnames/bind";
import { Link, generatePath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faBars,
    faRankingStar,
    faMagnifyingGlass,
    faCircleXmark,
    faSpinner,
    faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import { actions, useStore } from "../../context/store";
import { useRef, useState } from "react";
import { USER_MENU_TOP_COMIC } from "../../utils/constants";

const genre = [
    { id: 0, name: "Kiếm hiệp" },
    { id: 1, name: "Tiểu thuyết" },
    { id: 2, name: "Ngôn tình" },
    { id: 3, name: "Trinh thám" },
    { id: 4, name: "Học đường" },
    { id: 5, name: "Đời thường" },
    { id: 6, name: "Xuyên không" },
    { id: 7, name: "Linh dị" },
    { id: 8, name: "Đô thị" },
];
const userAction = [
    { name: "Thông tin người dùng", path: "/" },
    { name: "Đăng ký thành viên", path: "/" },
    { name: "Truyện yêu thích", path: "/like" },
    { name: "Truyện theo dõi", path: "/mark" },
    { name: "Đăng xuất", path: "/" },
];
const cx = classNames.bind(styles);

function Header() {
    const [, dispatch] = useStore();
    const [inSearch, setInSearch] = useState("");
    const inRef = useRef(null);
    // console.log('header render')

    const handleGenre = (gen) => {
        dispatch(actions.setUserFilterSearchReset());
        dispatch(actions.setUserFilterSearchGenre(gen.name));
        dispatch(actions.setUserFilterSearch());
    };

    return (
        <div className={cx("row", "wrapper")}>
            <div className={cx("row", "a-5", "b-5", "full")}>
                <Link className={cx("col", "a-3", "b-4", "o")} to={"/"}>
                    <img alt="icon" className={cx("logo")} src="/logo.ico" />
                </Link>
                {/* Danh mục */}
                <div className={cx("col", "a-4", "b-4", "genre")}>
                    <div className={cx("hover", "genre-menu")}>
                        <FontAwesomeIcon
                            className="icon-gutters"
                            icon={faBars}
                        />
                        Danh mục
                    </div>
                    {/* List thể loại truyện */}
                    <div className={cx("genre-options")}>
                        <div className={cx("row", "a-12", "list")}>
                            {genre.map((gen) => (
                                <Link
                                    key={gen.id}
                                    className={cx("col", "a-6", "item")}
                                    to={"/search"}
                                    onClick={() => handleGenre(gen)}
                                >
                                    {gen.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* xếp hạng */}
                <div className={cx("col", "a-4", "b-4", "top")}>
                    <div className={cx("top-menu", "hover")}>
                        <FontAwesomeIcon
                            icon={faRankingStar}
                            className="icon-gutters"
                            size="lg"
                        />
                        <p className="dis-select">Xếp hạng</p>
                    </div>
                    {/* List xếp hạng */}
                    <div className={cx("top-options")}>
                        <div className={cx("row", "a-12", "list")}>
                            {USER_MENU_TOP_COMIC.map((item, index) => (
                                <Link
                                    key={index}
                                    className={cx("col", "a-12", "item")}
                                    to={item.path}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Search */}
            <div className={cx("row", "a-3", "b-4", "o", "search")}>
                <input
                    ref={inRef}
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={inSearch}
                    onChange={(e) => setInSearch(e.target.value)}
                    spellCheck={false}
                />
                <button
                    className={cx("clear", { hidden: inSearch === "" })}
                    onClick={() => {
                        setInSearch("");
                        inRef.current.focus();
                    }}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                {/* <button className={cx("loading")}>
                    <FontAwesomeIcon icon={faSpinner} />
                </button> */}
                <Link
                    className={cx("search-btn")}
                    to={generatePath("/search/:param", { param: inSearch })}
                    onClick={() => {
                        dispatch(actions.setUserFilterSearchReset());
                        setInSearch("");
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
            </div>
            <div className={cx("row", "a-3", "b-3", "full", "action")}>
                {false ? (
                    <>
                        <Link
                            className={cx(
                                "col",
                                "a-6",
                                "o",
                                "space-around",
                                "hover"
                            )}
                            to={"/login"}
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            className={cx(
                                "col",
                                "a-6",
                                "o",
                                "space-around",
                                "hover"
                            )}
                            to={"/signin"}
                        >
                            Đăng Ký
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            className={cx(
                                "col",
                                "a-6",
                                "o",
                                "space-around",
                                "hover"
                            )}
                            to={"/history"}
                        >
                            <div>
                                <FontAwesomeIcon
                                    className="icon-gutters"
                                    icon={faClockRotateLeft}
                                />
                                Lịch sử đọc
                            </div>
                        </Link>
                        {/* User */}
                        <div className={cx("col", "a-6", "user")}>
                            <div className={cx("hover", "user-menu")}>
                                <FontAwesomeIcon
                                    className="icon-gutters"
                                    icon={faUser}
                                />
                                Lucky
                            </div>
                            {/* User action */}
                            <div className={cx("user-options")}>
                                <div className={cx("row", "a-12", "list")}>
                                    {userAction.map((item, index) => (
                                        <Link
                                            key={index}
                                            className={cx(
                                                "col",
                                                "a-12",
                                                "item"
                                            )}
                                            to={item.path}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
