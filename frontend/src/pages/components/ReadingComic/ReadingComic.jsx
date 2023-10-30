import styles from "./ReadingComic.module.scss";
import classNames from "classnames/bind";
import ReadingComicItem from "./ReadingComicItem/ReadingComicItem";

const cx = classNames.bind(styles);

function ReadingComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-2")}>Truyện đã đọc</p>
            </div>
            <div className="col a-10 a-o-1">
                <ReadingComicItem />
            </div>
            <div className="col a-10 a-o-1">
                <ReadingComicItem />
            </div>
            <div className="col a-10 a-o-1">
                <ReadingComicItem />
            </div>
            <div className="col a-10 a-o-1">
                <ReadingComicItem />
            </div>
        </div>
    );
}

export default ReadingComic;
