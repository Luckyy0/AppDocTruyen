import { UserMark, UserSidebar } from "../../components";
import styles from "./Mark.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Mark() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar />
            </div>
            <div className="col a-10">
                <UserMark />
            </div>
        </div>
    );
}

export default Mark;
