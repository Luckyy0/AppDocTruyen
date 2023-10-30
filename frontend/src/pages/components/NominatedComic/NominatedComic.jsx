import styles from "./NominatedComic.module.scss";
import classNames from "classnames/bind";
import NominatedComicItem from "./NominatedComicItem";

const cx = classNames.bind(styles);

function NominatedComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-1")}>Truyện đề cử</p>
            </div>
            <div className="row">
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
            </div>
        </div>
    );
}

export default NominatedComic;
