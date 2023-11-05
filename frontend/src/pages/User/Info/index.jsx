import { UserInfo, UserSidebar } from "../../components";
import styles from "./Info.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Info() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar />
            </div>
            <div className="col a-10">
                <UserInfo />
            </div>
        </div>
    );
}

export default Info;
