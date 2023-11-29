import { USER_MENU_TOP_COMIC } from "../../../utils/constants";
import { TopLikeComic, TopSideBar } from "../../components";
import styles from "./TopLike.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function TopLike() {
    const selected = USER_MENU_TOP_COMIC.findIndex(
        (it) => it.path === "/toplike"
    );
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar selected={selected} />
            </div>
            <div className="col a-10">
                <TopLikeComic />
            </div>
        </div>
    );
}

export default TopLike;
