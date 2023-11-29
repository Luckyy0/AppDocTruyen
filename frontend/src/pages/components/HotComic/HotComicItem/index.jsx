import { TopTag, VipTag } from "../../../../components";
import styles from "./HotComicItem.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function HotComicItem({ item, index }) {
    return (
        <div className={cx("container")}>
            <Link
                className={cx("content-1")}
                to={"/book/" + item.id}
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
            >
                {item.type === "PAID" ? <VipTag /> : <></>}
                <img className={cx("image")} src={item.image} alt="img" />
                <TopTag index={index + 1} />
            </Link>
            <div className={cx("item__content")}>
                <div className={cx("item__name")}>
                    {item.name.length > 20
                        ? item.name.slice(0, 20) + ". . ."
                        : item.name}
                </div>
            </div>
        </div>
    );
}

export default HotComicItem;
