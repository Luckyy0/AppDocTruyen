import styles from "./TagDelete.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const cx = classNames.bind(styles);
const bg = [
    "rgb(240, 12, 118)",
    "rgb(202, 17, 202)",
    "rgb(153, 240, 12)",
    "rgb(77, 34, 231)",
    "rgb(158, 233, 18)",
    "brown",
];

function TagDelete({ name, onClick }) {
    return (
        <div
            className={cx("wrapper")}
            style={{
                backgroundColor: bg[Math.floor(Math.random() * bg.length)],
            }}
            onClick={onClick}
        >
            <p className={cx("name")}>{name}</p>
            <FontAwesomeIcon icon={faCircleXmark} />
        </div>
    );
}

export default memo(TagDelete);
