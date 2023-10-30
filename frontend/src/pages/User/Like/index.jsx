import { UserLike, UserSidebar } from "../../components";
import styles from "./Like.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Like() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className="col a-2">
                <UserSidebar />
            </div>
            <div className="col a-10">
                <UserLike />
            </div>
        </div>
    );
}

export default Like;
