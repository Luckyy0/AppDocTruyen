import { useEffect, useRef, useState } from "react";
import { UserImage } from "../../../../components";
import styles from "./CommentHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function CommentHeader() {
    const inputRef = useRef(null);
    console.log("render");

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
            <div className={cx("col", "a-1",'a-o-1', "user-image")}>
                <UserImage />
            </div>
            <div className={cx("header_main", "col", "a-8")}>
                <textarea
                    onChange={() => {
                        resizeTextArea();
                    }}
                    ref={inputRef}
                    className={cx("input")}
                    placeholder="Bình luận của bạn ...."
                    spellCheck={false}
                    type="text"
                />
            </div>
            <div className={cx("submit", "col", "a-1")}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
        </div>
    );
}

export default CommentHeader;
