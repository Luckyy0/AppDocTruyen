import styles from "./UserHistory.module.scss";
import classNames from "classnames/bind";
import UserHistoryItem from "./UserHistoryItem";

const cx = classNames.bind(styles);

function UserHistory() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Lịch sử đọc</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <UserHistoryItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserHistoryItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserHistoryItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserHistoryItem />
                </div>
            </div>
        </div>
    );
}

export default UserHistory;
