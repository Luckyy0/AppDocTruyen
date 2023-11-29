import { useState } from "react";
import styles from "./tag.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const bg = [
    "rgb(240, 12, 118)",
    "rgb(202, 17, 202)",
    "rgb(153, 240, 12)",
    "rgb(77, 34, 231)",
    "rgb(158, 233, 18)",
    "brown",
];

function Tag({ name, icon, isDisable=false, onClick, bgd=bg[Math.floor(Math.random() * bg.length)] }) {
    return (
        <div
            className={cx("wrapper",{disable: isDisable})}
            style={{
                backgroundColor: bgd,
            }}
            onClick={onClick}
        >
            {icon}
            <p className={cx("name")}>{name}</p>
        </div>
    );
}

export default Tag;
