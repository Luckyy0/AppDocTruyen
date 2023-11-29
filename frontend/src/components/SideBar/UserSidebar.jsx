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
import useGenres from "../../hook/useGenre";

const cx = classNames.bind(styles);

const comicState = ["Đang ra", "Hoàn thành"];
const comicType = ["Miễn phí", "Trả phí"];

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
    const ref = useRef(null);
    const { genres } = useGenres();
    const {
        userSearchFilterGenre,
        userSearchFilterChap,
        userSearchFilterState,
        userSearchFilterSidebar,
        userSearchFilterType,
    } = state;

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

    const handleTypeComic = useCallback(
        (comicType) => {
            dispatch(actions.setUserFilterSearchType(comicType));
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
                    {genres.map((gen) => (
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
            {/* Loại truyện */}
            <div className={cx("form")}>
                <Label name="Loại truyện" />
                <div className={cx("content")}>
                    {comicType.map((comicType, index) => (
                        <TagWithBorder
                            key={index}
                            name={comicType}
                            onClick={() => handleTypeComic(comicType)}
                            hidden={userSearchFilterType === comicType}
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
