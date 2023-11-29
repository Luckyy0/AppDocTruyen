import { USER_MENU_TOP_COMIC } from "../../../utils/constants";
import { TopTrendComic, TopSideBar } from "../../components";
import styles from "./TopTrend.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


function TopTrend() {
    const selected = USER_MENU_TOP_COMIC.findIndex(it => it.path === "/toptrend")
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar  selected={selected}/>
            </div>
            <div className="col a-10">
                <TopTrendComic />
            </div>
        </div>
    );
}

export default TopTrend;
