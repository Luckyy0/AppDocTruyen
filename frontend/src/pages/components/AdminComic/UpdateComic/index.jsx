import styles from "./UpdateComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminUpdateComic() {
    return <div className={cx("wrapper")}>update comic</div>;
}

export default AdminUpdateComic;
