import styles from "./label.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";

const cx = classNames.bind(styles);

function Label({ name, icon }) {
    return (
        <div className={cx("wrapper")}>
            {icon}
            <p className={cx("name")}>{name}</p>
        </div>
    );
}

export default memo(Label);
