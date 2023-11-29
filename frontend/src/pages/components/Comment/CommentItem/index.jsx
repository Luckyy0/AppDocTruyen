import styles from "./CommentItem.module.scss";
import classNames from "classnames/bind";
import { UserImage } from "../../../../components";
import { useMemo } from "react";
import { useAuth } from "../../../../hook/useAuth";
const cx = classNames.bind(styles);

function CommentItem({item}) {
    const { auth } = useAuth();
    const handleDate = useMemo(()=>{
        const minutes = Math.floor((new Date() - new Date(item.createAt))/60000)
        if(minutes>60*24) return Math.floor(minutes/60/24) + " ngày trước"
        if(minutes>60) return Math.floor(minutes/60) + " giờ trước"
        return Math.floor(minutes )+ " phút trước"
    },[item.createAt])
    return (
        <div className={cx("wrapper")}>
            <div className={cx("col", "a-1", "a-o-1", "user-image")}>
                <UserImage image={item.user.userProfile.image}/>
            </div>
            <div className={cx("header_main", "col", "a-10")}>
                <p className={cx("username")}>{item.user.username===auth.username ? 'Tôi':item.user.username}</p>
                <p className={cx("time")}>{handleDate}</p>
                <p className={cx("comment")}>{item.content}</p>
                <div className={cx('content')}>
                    <div className={cx('like')}>Like</div>
                    <div className={cx('report')}> report</div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
