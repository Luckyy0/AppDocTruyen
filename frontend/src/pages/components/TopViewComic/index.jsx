import styles from "./TopViewComic.module.scss";
import classNames from "classnames/bind";
import TopViewComicItem from "./TopViewComicItem";

const cx = classNames.bind(styles);

function TopViewComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Top Lượt đọc</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <TopViewComicItem index={1}/>
                </div>
                <div className="col a-10 a-o-1">
                    <TopViewComicItem index={2}/>
                </div>
                <div className="col a-10 a-o-1">
                    <TopViewComicItem index={3}/>
                </div>
                <div className="col a-10 a-o-1">
                    <TopViewComicItem index={4}/>
                </div>
            </div>
        </div>
    );
}

export default TopViewComic;
