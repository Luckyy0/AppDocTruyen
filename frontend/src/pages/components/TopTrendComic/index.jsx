import styles from "./TopTrendComic.module.scss";
import classNames from "classnames/bind";
import TopTrendComicItem from "./TopTrendComicItem";

const cx = classNames.bind(styles);

function TopTrendComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Top Trending</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <TopTrendComicItem />
                </div>
                <div className="col a-10 a-o-1">
                    <TopTrendComicItem />
                </div>
                <div className="col a-10 a-o-1">
                    <TopTrendComicItem />
                </div>
                <div className="col a-10 a-o-1">
                    <TopTrendComicItem />
                </div>
            </div>
        </div>
    );
}

export default TopTrendComic;
