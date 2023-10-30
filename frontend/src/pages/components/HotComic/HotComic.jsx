import styles from "./HotComic.module.scss";
import classNames from "classnames/bind";
import HotComicItem from "./HotComicItem";

import {Link} from 'react-router-dom'

const cx = classNames.bind(styles);

function HotComic() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label",'col','a-1')}>Truyện hot</p>
            </div>

            <div className={cx("content", "row", " a-o-1", "a-10")}>
                <Link className="col a-4" to={'/book'}>
                    <HotComicItem />
                </Link>
                <div className={cx("col", "a-8", "row", "content-1")}>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                    <Link className="col a-3" to={'/book'}>
                        <HotComicItem />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HotComic;
