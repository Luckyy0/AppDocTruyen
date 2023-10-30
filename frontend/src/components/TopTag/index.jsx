import styles from "./topTag.module.scss";
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

function TopTag({ index }) {
    return (
        <div className={cx("index")}>
            {index}
        </div>
    );
}

export default TopTag;
