import { TopTag } from "../../../../components";
import styles from "./HotComicItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function HotComicItem() {
    return (
        <div className={cx("container")}>
            <div className={cx("content-1")}>
                <img
                    className={cx("image")}
                    src="https://static.cdnno.com/poster/uyen-thien-ton/300.jpg?1673168341"
                    alt="img"
                />
                <TopTag index={1}/>
            </div>
            <div className={cx("item__content")}>
                <div className={cx("item__name")}>Comic name</div>
            </div>
        </div>
    );
}

export default HotComicItem;
