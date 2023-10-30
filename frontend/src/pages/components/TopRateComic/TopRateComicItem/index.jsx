import styles from "./TopRateComicItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Genre, TopTag } from "../../../../components";

const cx = classNames.bind(styles);

function TopRateComicItem({index}) {
    return (
        <div className={cx("wrapper")}>
            <Link className={cx("image")} to={"/book"}>
                <img
                    className={cx("image-main")}
                    src="https://static.cdnno.com/poster/ban-dao-tu-tien-tro-choi-thanh-su-that/300.jpg?1678332133"
                    alt="img"
                    
                />
                <TopTag index={index}/>
                
            </Link>
            <div className={cx("content_1")}>
                <Link className={cx("content-name")} to={"/book"}>
                    Mao sơn tróc quỷ nhân
                </Link>
                <p className={cx("content-des")}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid saepe expedita corrupti facilis laudantium placeat est, quis, reiciendis magnam reprehenderit, quae nihil ipsam quibusdam. Nisi vitae velit alias reiciendis unde?
                </p>
                <div className={cx("content-child")}>
                    <p className={cx("content-auth")}>Tác giả</p>
                    <p>đánh giá: 4.5</p>
                    <Genre name={"Kiếm hiệp"}/>
                </div>
            </div>
        </div>
    );
}

export default TopRateComicItem;