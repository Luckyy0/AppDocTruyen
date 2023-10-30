import styles from "./UserMark.module.scss";
import classNames from "classnames/bind";
import UserMarkItem from "./UserMarkItem";

const cx = classNames.bind(styles);

function UserMark() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Truyện đang theo dõi</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <UserMarkItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserMarkItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserMarkItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserMarkItem />
                </div>
            </div>
        </div>
    );
}

export default UserMark;
