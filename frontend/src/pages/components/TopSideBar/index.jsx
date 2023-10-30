import styles from "./TopSidebar.module.scss";
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

function TopSideBar() {
    return (
        <div className={cx("wrapper", "col", "a-12")}>
            <Link className={cx("item", "col", "a-12")} to={'/topview'}>
                <p className={cx('name')}>Đọc nhiều</p>
            </Link>
            <Link className={cx("item", "col", "a-12")} to={'/toplike'}>
                <p className={cx('name')} >Yêu thích</p>
            </Link>
            <Link className={cx("item", "col", "a-12")} to={'/toprate'}>
                <p className={cx('name')} >Đánh giá cao</p>
            </Link>
            <Link className={cx("item", "col", "a-12")} to={'/toptrend'}>
                <p className={cx('name')}>Thịnh hành</p>
            </Link>
        </div>
    );
}

export default TopSideBar;
