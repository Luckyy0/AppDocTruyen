import styles from "./AddComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminAddComic() {
    return <div className={cx("wrapper")}>add comic</div>;
}

export default AdminAddComic;
