import styles from "./Search.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function SearchComponent({ onkeydown, value, onChange }) {
    return (
        <div className={cx("search")}>
            <input
                className={cx("search-input")}
                type="text"
                placeholder="Tìm kiếm....."
                spellCheck={false}
                value={value}
                onChange={onChange}
                onKeyDown={onkeydown}
            />
            <button className={cx("search-btn")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            {/* 
            <div className={cx("search-content")}>
                <div className={cx("row", "a-12", "list")}>
                    h2
                </div>
            </div> */}
        </div>
    );
}

export default SearchComponent;
