import classNames from "classnames/bind";
import { UserMark, UserSidebar } from "../../components";
import styles from "./Mark.module.scss";
import { USER_ACTION } from "../../../utils/constants";
const cx = classNames.bind(styles);

function Mark() {
    const selected = USER_ACTION.findIndex(it => it.path === "/mark")
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar selected={selected} />
            </div>
            <div className="col a-10">
                <UserMark />
            </div>
        </div>
    );
}

export default Mark;
