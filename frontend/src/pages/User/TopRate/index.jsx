import { USER_MENU_TOP_COMIC } from "../../../utils/constants";
import { TopRateComic, TopSideBar } from "../../components";
import styles from "./TopRate.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function TopRate() {
    const selected = USER_MENU_TOP_COMIC.findIndex(it => it.path === "/toprate")
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar selected={selected}/>
            </div>
            <div className="col a-10">
                <TopRateComic />
            </div>
        </div>
    );
}

export default TopRate;
