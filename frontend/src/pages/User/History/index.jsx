import { USER_ACTION } from "../../../utils/constants";
import { UserHistory, UserSidebar } from "../../components";
import styles from "./History.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function History() {
    const selected = USER_ACTION.findIndex(it => it.path === "/history")
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar selected={selected}/>
            </div>
            <div className="col a-10">
                <UserHistory />
            </div>
        </div>
    );
}

export default History;
