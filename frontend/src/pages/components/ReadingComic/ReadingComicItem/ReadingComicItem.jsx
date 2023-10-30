import styles from "./ReadingComicItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ReadingComicItem() {
    return (
        <div className={cx("wrapper", "row")}>
            <div className={cx("image", "col", "a-2")}>
                <img
                    className={cx("image-main")}
                    src="https://static.cdnno.com/poster/tien-phu-1/300.jpg?1691555408"
                    alt="img"
                />
            </div>
            <div className={cx("content", "col", "a-10")}>
                <p className={cx("content-name")}>Tên truyện</p>
                <div className={cx("row")}>
                    <p className={cx("content-dadoc", "col", "a-8")}>Đang đọc: chương 1</p>
                    <p
                        className={cx(
                            "content-genre",
                            "col",
                            "a-4"
                        )}
                    >
                        Đọc tiếp
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReadingComicItem;
