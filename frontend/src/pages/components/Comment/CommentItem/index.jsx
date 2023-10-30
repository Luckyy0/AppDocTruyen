import styles from "./CommentItem.module.scss";
import classNames from "classnames/bind";
import { UserImage } from "../../../../components";
const cx = classNames.bind(styles);

function CommentItem() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("col", "a-1", "a-o-1", "user-image")}>
                <UserImage />
            </div>
            <div className={cx("header_main", "col", "a-10")}>
                <p className={cx("username")}>luckyo123</p>
                <p className={cx("time")}>6 giờ trước</p>
                <p className={cx("comment")}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis? Obcaecati, voluptatibus dolorum voluptatum omnis maxime quia hic enim tempora quis, blanditiis quod. Necessitatibus exercitationem quidem eos sint culpa? Omnis.</p>
                <div className={cx('content')}>
                    <div className={cx('like')}>Like</div>
                    <div className={cx('report')}> report</div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
