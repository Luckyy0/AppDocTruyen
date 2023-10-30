import { Genre } from "../../../../components";
import styles from "./NominatedComicItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NominatedComicItem() {
    return (
        <div className={cx("wrapper")}>
            <Link className={cx("image")} to={'/book'}>
                <img
                    className={cx("image-main")}
                    src="https://static.cdnno.com/poster/ban-dao-tu-tien-tro-choi-thanh-su-that/300.jpg?1678332133"
                    alt="img"
                />
            </Link>
            <div className={cx("content")}>
                <Link className={cx("content-name")} to={'/book'}>Mao sơn tróc quỷ nhân</Link>
                <p className={cx("content-des")}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis dolorum, fugiat quibusdam modi veniam qui 
                </p>
                <div className={cx("content-child")}>
                    <p className={cx("content-auth")}>Tác giả</p>
                    <Genre name={"Kiếm hiệp"}/>
                </div>
            </div>
        </div>
    );
}

export default NominatedComicItem;
