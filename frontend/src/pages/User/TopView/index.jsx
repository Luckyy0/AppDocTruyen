import classNames from "classnames/bind";
import { USER_MENU_TOP_COMIC } from "../../../utils/constants";
import { TopSideBar, TopViewComic } from "../../components";
import styles from "./TopView.module.scss";
const cx = classNames.bind(styles);

function TopView() {
    const selected = USER_MENU_TOP_COMIC.findIndex(
        (it) => it.path === "/topview"
    );
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar selected={selected} />
            </div>
            <div className="col a-10">
                <TopViewComic />
            </div>
        </div>
    );
}

export default TopView;
