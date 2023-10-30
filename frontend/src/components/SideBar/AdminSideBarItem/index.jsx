import styles from "./AdminSidebarItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminSidebarItem({ name, icon, onClick, select }) {
    return (
        <div onClick={onClick} className={cx("wrapper",{isActive:select})}>
            {icon}
            <p className={cx("name")}>{name}</p>
        </div>
    );
}

export default AdminSidebarItem;
