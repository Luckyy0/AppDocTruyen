import styles from "./TopRateComic.module.scss";
import classNames from "classnames/bind";
import TopRateComicItem from "./TopRateComicItem";

const cx = classNames.bind(styles);

function TopRateComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Top đánh giá</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <TopRateComicItem index={1}/>
                </div>
                <div className="col a-10 a-o-1">
                    <TopRateComicItem index={2}/>
                </div>
                <div className="col a-10 a-o-1">
                    <TopRateComicItem index={3}/>
                </div>
                <div className="col a-10 a-o-1">
                    <TopRateComicItem index={4}/>
                </div>
            </div>
        </div>
    );
}

export default TopRateComic;
