import styles from "./NewUpdateComicItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NewUpdateComicItem() {
    return (
        <Link className={cx("wrapper", "row")} to={'/book'}>
            <p className={cx("content-genre", "a-2")}>Kiếm hiệp</p>
            <p className={cx("content-chap", "a-4")}>Một ngày chẳng nắng</p>
            <p className={cx("content-auth", "a-4")}>Đức Mạnh</p>
            <p className={cx("content-time", "a-2")}>4 phút trước</p>
        </Link>
    );
}

export default NewUpdateComicItem;
