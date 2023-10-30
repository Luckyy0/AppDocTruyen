import { UserHeader, UserSidebar, Footer } from "../../components";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <>
            <UserHeader />
            <div className={cx("container", "row","full", "no-gutters")}>
                <div className={cx("side-bar", "col", "a-3")}>
                    <UserSidebar />
                </div>
                <div className={cx("content", "col","a-o-1", "a-8")}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default MainLayout;
