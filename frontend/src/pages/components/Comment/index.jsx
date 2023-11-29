import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import CommentHeader from "./CommentHeader";
import CommentItem from "./CommentItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Label } from "../../../components";
import publicApi from "../../../api/PublicApi";
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import privateApi from "../../../api/PrivateApi";
import { useAuth } from "../../../hook/useAuth";
const cx = classNames.bind(styles);

const Comment = forwardRef(({ id, path }, ref) => {
    const commentRef = useRef(null);
    const { auth, setAuth } = useAuth();
    const [comments, setComments] = useState([]);
    const reqArg = path === "/commentComic" ? "comicId" : "chapterId";
    useImperativeHandle(ref, () => ({
        getClientHeight: () => commentRef.current.clientHeight,
    }));

    const fetchComments = async () => {
        try {
            const apiResponse = await publicApi.get(path + "/" + id);
            setComments(apiResponse.data);
            console.log(apiResponse.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleAddComment = async (commentInput, setCommentInput) => {
        if (!commentInput) alert("Không được để trống nội dung");
        else {
            try {
                await privateApi.post(path, {
                    [reqArg]: parseFloat(id),
                    content: commentInput,
                });
                fetchComments();
                setCommentInput("");
            } catch (error) {
                alert("Vui lòng đăng nhập");
                console.log(error.response?.data?.message || "Có lỗi xảy ra");
            }
        }
    };

    return (
        <div className={cx("col", "a-12", "wrapper")} ref={commentRef}>
            <Label
                name="Bình luận"
                icon={<FontAwesomeIcon icon={faComment} />}
            />
            <CommentHeader onClick={handleAddComment} />
            {comments.map((it) => (
                <CommentItem key={it.id} item={it} />
            ))}
        </div>
    );
});

export default Comment;
