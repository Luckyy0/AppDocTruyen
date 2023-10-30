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

function Tag({ name, icon }) {
    return (
        <div
            className={cx("wrapper")}
            style={{
                backgroundColor: bg[Math.floor(Math.random() * bg.length)],
            }}
        >
            {icon}
            <p className={cx("name")}>{name}</p>
        </div>
    );
}

export default Tag;
