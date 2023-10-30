import styles from "./UserLikeItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function UserLikeItem() {
    return (
        <div className={cx("wrapper")}>
            <Link className={cx("image")} to={"/book"}>
                <img
                    className={cx("image-main")}
                    src="https://static.cdnno.com/poster/ban-dao-tu-tien-tro-choi-thanh-su-that/300.jpg?1678332133"
                    alt="img"
                />
            </Link>
            <div className={cx("content_1")}>
                <Link className={cx("content-name")} to={"/book"}>Mao sơn tróc quỷ nhân</Link>
                <p className={cx("content-read")}>Đang đọc: 1/1005</p>
            </div>
            <div className={cx("content_2")}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    );
}

export default UserLikeItem;
