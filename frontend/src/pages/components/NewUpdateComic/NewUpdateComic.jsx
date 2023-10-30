import styles from "./NewUpdateComic.module.scss";
import classNames from "classnames/bind";
import NewUpdateComicItem from "./NewUpdateComicItem";

const cx = classNames.bind(styles);

function NewUpdateComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-2")}>Truyện mới cập nhật</p>
            </div>
            <div className="col a-10 a-o-1">
                <NewUpdateComicItem />
            </div>
            <div className="col a-10 a-o-1">
                <NewUpdateComicItem />
            </div>
            <div className="col a-10 a-o-1">
                <NewUpdateComicItem />
            </div>
            <div className="col a-10 a-o-1">
                <NewUpdateComicItem />
            </div>
        </div>
    );
}

export default NewUpdateComic;
