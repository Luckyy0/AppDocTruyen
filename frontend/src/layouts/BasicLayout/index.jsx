import { UserHeader, Footer } from "../../components";
import styles from "./BasicLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function BasicLayout({ children }) {
    return (
        <>
            <UserHeader />
            <div className={cx("container", "row","full", "no-gutters")}>
                <div className={cx("content", "col", "a-12")}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default BasicLayout;
