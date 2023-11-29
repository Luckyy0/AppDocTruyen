import styles from "./UserMarkItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function UserMarkItem({item,onClick}) {
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
                <p className={cx("content-read")}>Tổng lượt theo dõi: {item.comic.follow}</p>
            </div>
            <div className={cx("content_2")} onClick={()=> onClick(item.comic.id)}>
                <FontAwesomeIcon icon={faTrash} />
                
            </div>
        </div>
    );
}

export default UserMarkItem;
