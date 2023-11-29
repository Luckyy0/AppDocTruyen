import styles from "./ReadingComic.module.scss";
import classNames from "classnames/bind";
import ReadingComicItem from "./ReadingComicItem/ReadingComicItem";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function ReadingComic() {
    const [readingList, setReadingList] = useState([]);
    useEffect(() => {
        const storedReadList = localStorage.getItem("readingList");
        if (storedReadList) {
            setReadingList(JSON.parse(storedReadList));
        }
    }, []);
    
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-2")}>Truyện đã đọc</p>
            </div>
            {readingList.map(it => (
                <div key={it.chapId} className="col a-10 a-o-1">
                    <ReadingComicItem item={it}/>
                </div>
            ))}
        </div>
    );
}

export default ReadingComic;
