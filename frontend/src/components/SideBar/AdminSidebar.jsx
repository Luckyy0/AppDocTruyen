import Logo from "../Logo";
import AdminSidebarItem from "./AdminSideBarItem";
import styles from "./adminSidebar.module.scss";
import classNames from "classnames/bind";

import { actions,useStore } from "../../context/store"; 
import { ADMIN_MENU } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightLeft,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AdminSidebar() {
    const [menuState, dispatch] = useStore();

    const { adminMenuSelect } = menuState;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content_1", "col", "a-12")}>
                <Logo />
                <p className={cx("banner")}>Quản trị Website</p>
            </div>
            <div className={cx("content_2", "col", "a-12")}>
                <p className={cx("label")}>Menu</p>
                {ADMIN_MENU.map((menu, index) => (
                    <AdminSidebarItem
                        onClick={() => dispatch(actions.setAdminSelect(index))}
                        select={index === adminMenuSelect}
                        key={index}
                        name={menu.name}
                        icon={<FontAwesomeIcon icon={menu.icon} />}
                    />
                ))}
            </div>
            <div className={cx("content_3", "col", "a-12")}>
                <p className={cx("label")}>Orther</p>
                <AdminSidebarItem
                    name={"Chuyển đổi sang giao diện người dùng"}
                    icon={<FontAwesomeIcon icon={faRightLeft} />}
                />
                <AdminSidebarItem
                    name={"Đăng xuất"}
                    icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                />
            </div>
        </div>
    );
}

export default AdminSidebar;
