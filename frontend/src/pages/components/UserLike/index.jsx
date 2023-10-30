import styles from "./UserLike.module.scss";
import classNames from "classnames/bind";
import UserLikeItem from "./UserLikeItem";

const cx = classNames.bind(styles);

function UserLike() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Truyện yêu thích</p>
            </div>
            <div className="row">
                <div className="col a-10 a-o-1">
                    <UserLikeItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserLikeItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserLikeItem />
                </div>
                <div className="col a-10 a-o-1">
                    <UserLikeItem />
                </div>
            </div>
        </div>
    );
}

export default UserLike;
