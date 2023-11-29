import styles from "./UserHistoryItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function UserHistoryItem({item, onClick}) {
    return (
        <div className={cx("wrapper")}>
            <Link className={cx("image")} to={"/book/"+item.comic.id+"/chap/"+item.chapId}>
                <img
                    className={cx("image-main")}
                    src={item.comic?.image}
                    alt="ig"
                />
            </Link>
            <div className={cx("content_1")}>
                <Link className={cx("content-name")} to={"/book/"+item.comic.id+"/chap/"+item.chapId}>
                    {item.comic?.name}
                </Link>
                <p className={cx("content-read")}>Đang đọc: chương {item.chapNumber}/{item.comic.chap}</p>
            </div>
            <div className={cx("content_2")}>
                <FontAwesomeIcon icon={faTrash} onClick={()=>onClick(item.comic.id)}/>
            </div>
        </div>
    );
}

export default UserHistoryItem;
