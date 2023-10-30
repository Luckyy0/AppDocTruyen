import styles from "./genre.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { memo } from "react";
import { actions, useStore } from "../../context/store";
const cx = classNames.bind(styles);

function Genre({ name }) {
    const [, dispatch] = useStore();
    return (
        <Link className={cx("wrapper")} to={"/search"} onClick={() => {
            dispatch(actions.setUserFilterSearchReset());
            dispatch(
                actions.setUserFilterSearchGenre(name)
            );
            dispatch(actions.setUserFilterSearch());
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }}>
            <p className={cx("name")}>{name}</p>
        </Link>
    );
}

export default memo(Genre);
