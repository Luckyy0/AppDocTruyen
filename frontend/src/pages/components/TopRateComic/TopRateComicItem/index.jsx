import styles from "./TopRateComicItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Genre, TopTag, VipTag } from "../../../../components";

const cx = classNames.bind(styles);

function TopRateComicItem({ index, item }) {
    return (
        <div className={cx("wrapper")}>
            <Link className={cx("image")} to={"/book/" + item.id}>
                {item.type === "PAID" ? <VipTag /> : <></>}
                <img className={cx("image-main")} src={item.image} alt="img" />
                <TopTag index={index} />
            </Link>
            <div className={cx("content_1")}>
                <Link className={cx("content-name")} to={"/book/" + item.id}>
                    {item.name}
                </Link>
                <p className={cx("content-des")}>
                    {item.description.length > 280
                        ? item.description.slice(0, 280) + "..."
                        : item.description}
                </p>
                <div className={cx("content-child")}>
                    <p className={cx("content-auth")}>
                        Tác giả: {item.author.name}
                    </p>
                    <p>Lượt theo dõi: {item.follow}</p>
                    <Genre name={"Kiếm hiệp"} />
                </div>
            </div>
        </div>
    );
}

export default TopRateComicItem;
