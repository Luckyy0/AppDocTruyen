import styles from "./TagWithBorder.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";

const cx = classNames.bind(styles);

function TagWithBorder({ name, onClick, hidden }) {
    return (
        <div className={cx("wrapper",{hidden:hidden})} onClick={onClick}>
            <p className={cx("name")}>{name}</p>
        </div>
    );
}

export default memo(TagWithBorder);
