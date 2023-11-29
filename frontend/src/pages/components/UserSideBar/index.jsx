import styles from "./userSidebar.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { USER_ACTION } from "../../../utils/constants";

const cx = classNames.bind(styles);

function UserSidebar({ selected }) {
    return (
        <div className={cx("wrapper", "col", "a-12")}>
            {USER_ACTION.map((item, index) => (
                <Link
                    key={index}
                    className={cx("item", "col", "a-12", {
                        active: index === selected,
                    })}
                    to={item.path}
                >
                    <p className={cx("name")}>{item.name}</p>
                </Link>
            ))}
            <Link
                className={cx("item", "col", "a-12")}
                to={"/"}
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                }}
            >
                <p className={cx("name")}>Đăng xuất</p>
            </Link>
        </div>
    );
}

export default UserSidebar;
