import styles from "./AdminBasicLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminBasicLayout({ children }) {
    return (
        <>
            <div className={cx("container", "row", "no-gutters")}>
                {children}
            </div>
        </>
    );
}

export default AdminBasicLayout;
