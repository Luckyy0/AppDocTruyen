import styles from "./GenreComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminGenreComic() {
    return <div className={cx("wrapper")}>genre</div>;
}

export default AdminGenreComic;
