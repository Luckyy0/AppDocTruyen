import styles from "./userSidebar.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListUl,
    faBook,
    faHeart,
    faThumbsUp,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Label, Tag } from "../../../components";

const cx = classNames.bind(styles);

function UserSidebar() {
    return (
        <div className={cx("wrapper", "col", "a-12")}>
            <Link className={cx("item", "col", "a-12")}>
                <p className={cx('name')}>Thông tin người dùng</p>
            </Link>
            <Link className={cx("item", "col", "a-12")} to={'/history'}>
                <p className={cx('name')} >Lịch sử đọc</p>
            </Link>
            <Link className={cx("item", "col", "a-12")} to={'/like'}>
                <p className={cx('name')} >Truyện yêu thích</p>
            </Link>
            <Link className={cx("item", "col", "a-12")} to={'/mark'}>
                <p className={cx('name')}>Truyện đang theo dõi</p>
            </Link>
            <Link className={cx("item", "col", "a-12")}>
                <p className={cx('name')}>Đăng xuất</p>
            </Link>
        </div>
    );
}

export default UserSidebar;
