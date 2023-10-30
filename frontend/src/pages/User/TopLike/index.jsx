import { TopLikeComic, TopSideBar } from "../../components";
import styles from "./TopLike.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function TopLike() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar />
            </div>
            <div className="col a-10">
                <TopLikeComic />
            </div>
        </div>
    );
}

export default TopLike;
