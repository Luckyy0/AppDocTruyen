import styles from "./logo.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Logo() {
    return (
        <Link className={cx("wrapper")} to={"/"}>
            <div className={cx('img')} >
                <img alt="icon" className={cx("logo")} src="/logo.ico" />
            </div>
            <p className={cx("name")}>Taka</p>
        </Link>
    );
}

export default Logo;
