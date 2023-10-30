import styles from "./FeeComic.module.scss";
import classNames from "classnames/bind";
import FeeComicItem from "./FeeComicItem/FeeComicItem";

const cx = classNames.bind(styles);

function FeeComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-2")}> Truyện trả phí </p>
            </div>
            <div className={cx("content", "row", " a-o-1", "a-10")}>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
                <div className="col a-3">
                    <FeeComicItem />
                </div>
            </div>
        </div>
    );
}

export default FeeComic;
