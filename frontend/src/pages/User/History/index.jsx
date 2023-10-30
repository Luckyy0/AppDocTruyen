import { UserHistory, UserSidebar } from "../../components";
import styles from "./History.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function History() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar />
            </div>
            <div className="col a-10">
                <UserHistory />
            </div>
        </div>
    );
}

export default History;
