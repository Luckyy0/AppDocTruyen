import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { USER_MENU_TOP_COMIC } from "../../../utils/constants";
import styles from "./TopSidebar.module.scss";

const cx = classNames.bind(styles);

function TopSideBar({ selected }) {
    return (
        <div className={cx("wrapper", "col", "a-12")}>
            {USER_MENU_TOP_COMIC.map((it, index) => (
                <Link
                    key={index}
                    className={cx("item", "col", "a-12",{active: index===selected})}
                    to={it.path}
                >
                    <p className={cx("name")}>{it.name}</p>
                </Link>
            ))}
        </div>
    );
}

export default TopSideBar;
