import styles from "./TopLikeComic.module.scss";
import classNames from "classnames/bind";
import TopLikeComicItem from "./TopLikeComicItem";

const cx = classNames.bind(styles);

function TopLikeComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Top truyện yêu thích</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <TopLikeComicItem />
                </div>
                <div className="col a-10 a-o-1">
                    <TopLikeComicItem />
                </div>
                <div className="col a-10 a-o-1">
                    <TopLikeComicItem />
                </div>
                <div className="col a-10 a-o-1">
                    <TopLikeComicItem />
                </div>
            </div>
        </div>
    );
}

export default TopLikeComic;
