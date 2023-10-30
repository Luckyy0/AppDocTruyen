import styles from "./adminHeader.module.scss";
import classNames from "classnames/bind";
import { useStore } from "../../context/store";
import { ADMIN_MENU } from "../../utils/constants";

const cx = classNames.bind(styles);


function AdminHeader({ pageName }) {
    const [menuState] = useStore();

    const { adminMenuSelect } = menuState;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("name")}>{pageName}{ADMIN_MENU.at(adminMenuSelect).name}</div>
            <div className={cx("user")}>User: lucky</div>
        </div>
    );
}

export default AdminHeader;
