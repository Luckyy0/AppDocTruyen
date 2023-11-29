import { useEffect, useRef, useState } from "react";
import { UserImage } from "../../../../components";
import styles from "./CommentHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useAuth } from "../../../../hook/useAuth";
const cx = classNames.bind(styles);

function CommentHeader({ onClick }) {
    const { auth } = useAuth();
    const [commentInput, setCommentInput] = useState("");
    const inputRef = useRef(null);

    const resizeTextArea = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.style.height = "auto"; // will not work without this!
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    };
    useEffect(() => {
        resizeTextArea();
        // window.addEventListener("resize", resizeTextArea);
    }, []);

    return (
        <div className={cx("row", "a-12", "wrapper")}>
            <div className={cx("col", "a-1", "a-o-1", "user-image")}>
                <UserImage image={auth.image}/>
            </div>
            <div className={cx("header_main", "col", "a-8")}>
                <textarea
                    onChange={(e) => {
                        resizeTextArea();
                        setCommentInput(e.target.value)
                    }}
                    value={commentInput}
                    ref={inputRef}
                    className={cx("input")}
                    placeholder="Bình luận của bạn ...."
                    spellCheck={false}
                    type="text"
                    required={true}
                />
            </div>
            <div className={cx("submit", "col", "a-1")} onClick={()=>onClick(commentInput,setCommentInput)}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
        </div>
    );
}

export default CommentHeader;
