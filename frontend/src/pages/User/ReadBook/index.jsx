import styles from "./readBook.module.scss";
import classNames from "classnames/bind";
import { ChapterContent, Comment } from "../../components";
const cx = classNames.bind(styles);

function ReadBook() {
    return (
        <div className={cx("wrapper")}>
            <ChapterContent/> 
            <Comment />
        </div>
    );
}

export default ReadBook;
