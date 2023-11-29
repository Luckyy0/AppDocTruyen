import classNames from "classnames/bind";
import { BannerSubscription, Toast } from "../../../components";
import {
    FeeComic,
    HotComic,
    NewUpdateComic,
    NominatedComic,
    ReadingComic,
} from "../../components";
import styles from "./home.module.scss";

const cx = classNames.bind(styles);

function UserHome() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("banner-subscription")}>
                <BannerSubscription />
            </div>
            <div className={cx("hot-comic")}>
                <HotComic />
            </div>
            <div className={cx("content-1", "row")}>
                <div className="col a-9">
                    <NominatedComic />
                </div>
                <div className="col a-3">
                    <ReadingComic />
                </div>
            </div>
            <NewUpdateComic />
            <FeeComic />
        </div>
    );
}

export default UserHome;
