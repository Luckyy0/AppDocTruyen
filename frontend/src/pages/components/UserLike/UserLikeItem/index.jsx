import styles from "./UserLikeItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function UserLikeItem({item, onClick}) {
    return (
        <div className={cx("wrapper")}>
            <Link className={cx("image")} to={"/book/"+item.comic.id}>
                <img
                    className={cx("image-main")}
                    src={item.comic.image}
                    alt="ig"
                />
            </Link>
            <div className={cx("content_1")}>
                <Link className={cx("content-name")} to={"/book/"+item.comic.id}>{item.comic.name}</Link>
                <p className={cx("content-read")}>Tổng số lượt thích: {item.comic.like}</p>
            </div>
            <div className={cx("content_2")} onClick={()=> onClick(item.comic.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    );
}

export default UserLikeItem;
