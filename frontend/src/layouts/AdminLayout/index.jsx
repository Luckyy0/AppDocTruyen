import { AdminHeader, AdminSidebar } from "../../components";
import styles from "./AdminLayout.module.scss";
import classNames from "classnames/bind";

import { ADMIN_PAGE } from "../../utils/constants";
import { useStore } from "../../context/store";

const cx = classNames.bind(styles);

function AdminLayout() {
    const [menuState] = useStore();

    const { adminMenuSelect } = menuState;
    return (
        <>
            <div className={cx("container", "row", "no-gutters")}>
                <div className={cx("side-bar", "col", "a-2",'b-3','c-3')}>
                    <AdminSidebar />
                </div>
                <div className={cx("main-page", "col", "a-10",'b-9','c-9')}>
                    <AdminHeader />
                    {ADMIN_PAGE.filter(
                        (page, index) => index === adminMenuSelect
                    ).map((page, index) => {
                        const Page = page.page;
                        return <Page key={index} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
