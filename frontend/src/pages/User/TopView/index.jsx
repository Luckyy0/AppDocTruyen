import { TopViewComic, TopSideBar } from "../../components";
import styles from "./TopView.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function TopView() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <TopSideBar />
            </div>
            <div className="col a-10">
                <TopViewComic />
            </div>
        </div>
    );
}

export default TopView;
