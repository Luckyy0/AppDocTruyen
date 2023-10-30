import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import CommentHeader from "./CommentHeader";
import CommentItem from "./CommentItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,

} from "@fortawesome/free-solid-svg-icons";
import { Label } from "../../../components";
const cx = classNames.bind(styles);

function Comment() {
    return (
        <div className={cx('col', 'a-12','wrapper')}>
            <Label name="Bình luận" icon={<FontAwesomeIcon icon={faComment} />}/>
            <CommentHeader />
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
        </div>
    );
}

export default Comment;
