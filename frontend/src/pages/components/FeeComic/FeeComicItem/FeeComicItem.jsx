import styles from "./FeeComicItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FeeComicItem() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-1")}>
                <img
                    className={cx("image")}
                    src="https://static.cdnno.com/poster/ban-dao-tu-tien-tro-choi-thanh-su-that/300.jpg?1678332133"
                    alt="img"
                />
            </div>
            <div className={cx("content-2")}>
                <p className={cx("label")}>
                    Cuộc Cách Mạng Glucose - Thông Điệp Mới Mẻ Từ Đường Huyết
                </p>
                <p className={cx("auth")}>Tác giả</p>
                <div className={cx("react")}>
                    <p className={cx("rating")}>Đánh giá</p>
                    <p className={cx("comment")}>Nhận xét</p>
                </div>
                <p className={cx("time-update")}>6 giờ 54 phút</p>
            </div>
        </div>
    );
}

export default FeeComicItem;
