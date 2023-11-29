import { Genre, VipTag } from "../../../../components";
import styles from "./NominatedComicItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NominatedComicItem({ item }) {
    return (
        <div className={cx("wrapper")}>
            <Link
                className={cx("image")}
                to={"/book/" + item.id}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                }}
            >
                <div className={cx('content')}>
                    {item.type==='PAID' ? <VipTag />:<></>}
                    
                    <img
                        className={cx("image-main")}
                        src={item.image}
                        alt="img"
                    />
                </div>
            </Link>
            <div className={cx("content")}>
                <Link
                    className={cx("content-name")}
                    to={"/book/" + item.id}
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    {item.name.length > 30
                        ? item.name.slice(0, 30) + ". . ."
                        : item.name}
                </Link>
                <p className={cx("content-des")}>
                    {item.description.length > 70
                        ? item.description.slice(0, 70) + ". . ."
                        : item.description}
                </p>
                <div className={cx("content-child")}>
                    <p className={cx("content-auth")}>{item.author.name}</p>
                    <Genre item={item.genres[0]} />
                </div>
            </div>
        </div>
    );
}

export default NominatedComicItem;
