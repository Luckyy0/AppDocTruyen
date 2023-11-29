import styles from "./FeeComicItem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    faEye,
    faComment,
    faHeart,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { VipTag } from "../../../../components";

const cx = classNames.bind(styles);

function FeeComicItem({ item }) {
    return (
        <div className={cx("wrapper")}>
            <Link
                className={cx("content-1")}
                to={"/book/" + item.id}
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
            >
                <VipTag />
                <img className={cx("image")} src={item.image} alt="img" />
            </Link>
            <div className={cx("content-2")}>
                <Link
                    className={cx("label")}
                    to={"/book/" + item.id}
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    {item.name}
                </Link>
                <p className={cx("auth")}>{item.author.name}</p>
                <div className={cx("react")}>
                    <p className={cx("rating")}>
                        <FontAwesomeIcon icon={faComment} /> {item.comment}
                    </p>
                    <p className={cx("comment")}>
                        <FontAwesomeIcon icon={faHeart} /> {item.follow}
                    </p>
                </div>
                <div className={cx("react")}>
                    <p className={cx("rating")}>
                        <FontAwesomeIcon icon={faEye} /> {item.view}
                    </p>
                    <p className={cx("rating")}>
                        <FontAwesomeIcon icon={faThumbsUp} /> {item.like}
                    </p>
                </div>
                <p className={cx("time-update")}>
                    Chapter {item.chap} /{" "}
                    {item.status === "IN_PROGRESS" ? "??" : item.chap}
                </p>
            </div>
        </div>
    );
}

export default FeeComicItem;
