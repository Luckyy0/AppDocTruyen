import { FeeComic, HotComic, NewUpdateComic, NominatedComic, ReadingComic } from "../../components";
import styles from "./home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UserHome() {
    return (
        <div className={cx("wrapper")}>
            <HotComic />
            <div className={cx('content-1','row')}>
                <div className="col a-9">
                    <NominatedComic />
                </div>
                <div className="col a-3">
                    <ReadingComic />
                </div>
            </div>
            <NewUpdateComic/>
            <FeeComic/>
        </div>
    );
}

export default UserHome;
