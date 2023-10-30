import styles from "./userSidebar.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import Label from "../label";
import TagDelete from "../TagDelete";
import TagWithBorder from "../TagWithBorder";
import { actions, useStore } from "../../context/store";
import { useRef, memo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

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

const comicState = ["Đang ra", "Hoàn thành"];

const comicChapterNumber = [
    "0 - 100",
    "100 - 200",
    "200 - 400",
    "400 - 800",
    "800 - 1200",
    "1200+",
];

function UserSidebar() {
    let { "*": param } = useParams();
    const [state, dispatch] = useStore();
    console.log("param: " + param);
    const ref = useRef(null);
    const {
        userSearchFilterGenre,
        userSearchFilterChap,
        userSearchFilterState,
        userSearchFilterSidebar,
    } = state;
    console.log("sidebar user render");
    console.log(userSearchFilterSidebar);


    const handleFilter = useCallback(
        (item) => dispatch(actions.deleteUserFilterSearchOneItem(item)),
        [dispatch]
    );

    const handleGenre = useCallback(
        (gen) => {
            dispatch(actions.setUserFilterSearchGenre(gen.name));
            dispatch(actions.setUserFilterSearch());
        },
        [dispatch]
    );

    const handleChap = useCallback(
        (chap) => {
            dispatch(actions.setUserFilterSearchChap(chap));
            dispatch(actions.setUserFilterSearch());
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        },
        [dispatch]
    );

    const handleState = useCallback(
        (comicState) => {
            dispatch(actions.setUserFilterSearchState(comicState));
            dispatch(actions.setUserFilterSearch());
            // ref.current?.scrollIntoView({
            //     behavior: "smooth",
            //     block: "start",
            // });
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        },
        [dispatch]
    );

    return (
        <div ref={ref} className={cx("wrapper")}>
            <div className={cx("form")}>
                {/* Bộ lọc */}
                <Label name="Bộ lọc đã chọn" />
                <div className={cx("content")}>
                    {param ? (
                        <Link to={"/search"} className={cx("user_search")}>
                            <TagDelete name={param} />
                        </Link>
                    ) : (
                        <></>
                    )}

                    {userSearchFilterSidebar
                        .filter((item) => item !== "")
                        .map((item, index) => (
                            <TagDelete
                                key={index}
                                onClick={() => handleFilter(item)}
                                name={item}
                            />
                        ))}
                </div>
            </div>
            {/* Thể loại */}
            <div className={cx("form")}>
                <Label name="Thể loại" />
                <div className={cx("content")}>
                    {genre.map((gen) => (
                        <TagWithBorder
                            key={gen.id}
                            onClick={() => handleGenre(gen)}
                            hidden={userSearchFilterGenre.has(gen.name)}
                            name={gen.name}
                        />
                    ))}
                </div>
            </div>
            {/* Trạng thái */}
            <div className={cx("form")}>
                <Label name="Tình trạng" />
                <div className={cx("content")}>
                    {comicState.map((comicState, index) => (
                        <TagWithBorder
                            key={index}
                            name={comicState}
                            onClick={() => handleState(comicState)}
                            hidden={userSearchFilterState === comicState}
                        />
                    ))}
                </div>
            </div>
            {/* Số lượng chương */}
            <div className={cx("form")}>
                <Label name="Số lượng chương" />
                <div className={cx("content")}>
                    {comicChapterNumber.map((chap, index) => (
                        <TagWithBorder
                            key={index}
                            name={chap}
                            onClick={() => handleChap(chap)}
                            hidden={userSearchFilterChap === chap}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(UserSidebar);
