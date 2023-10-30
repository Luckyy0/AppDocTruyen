import { ComicInfo, Comment } from "../../components";
import styles from "./bookInfo.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function BookInfo() {
    return (
        <div className={cx("wrapper")}>
            <ComicInfo/>
            <Comment/>
        </div>
    );
}

export default BookInfo;
