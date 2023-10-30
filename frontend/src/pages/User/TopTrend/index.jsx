import { TopTrendComic, TopSideBar } from "../../components";
import styles from "./TopTrend.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function TopTrend() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar />
            </div>
            <div className="col a-10">
                <TopTrendComic />
            </div>
        </div>
    );
}

export default TopTrend;
