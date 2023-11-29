import { USER_ACTION } from "../../../utils/constants";
import { UserLike, UserSidebar } from "../../components";
import styles from "./Like.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Like() {
    const selected = USER_ACTION.findIndex((it) => it.path === "/like");
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar selected={selected} />
            </div>
            <div className="col a-10">
                <UserLike />
            </div>
        </div>
    );
}

export default Like;
