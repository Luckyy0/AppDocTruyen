import styles from "./BrowserComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminBrowserComic() {
    return <div className={cx("wrapper")}>Browser </div>;
}

export default AdminBrowserComic;
