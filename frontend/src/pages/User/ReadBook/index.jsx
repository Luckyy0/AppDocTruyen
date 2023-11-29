import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import privateApi from "../../../api/PrivateApi";
import { CustomReadChapter, Loading } from "../../../components";
import useGetChapter from "../../../hook/useGetChapter";
import { ChapterContent, Comment } from "../../components";
import styles from "./readBook.module.scss";
const cx = classNames.bind(styles);

function ReadBook() {
    const [customPageContent, setCustomPageContent] = useState({
        bg: "#fff",
        txt: "black",
        font: "Nunito Sans",
        txtSize: 16,
        lineHeight: 1.3,
    });
    const [checkUserVip, setCheckUserVip] = useState(false);
    const { bookId, chapId } = useParams();
    const { chapter, isLoadingChapter, errorChapter } = useGetChapter(
        bookId,
        chapId
    );
    const commentRef = useRef(null);

    

    // const [commentHeght, setCommentHeight] = useState(0);
    // console.log("Chiều cao phần comment: " + commentHeght);
    // useEffect(() => {
    //     if (commentRef.current) {
    //         const commentData = commentRef.current.getClientHeight();
    //         console.log('Comment data:', commentData);
    //       }
    // }, [commentRef]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseApi = await privateApi.get("/checkuser");
                setCheckUserVip(responseApi.data.status);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleColorClick = (item) => {
        setCustomPageContent({
            ...customPageContent,
            bg: item.bg,
            txt: item.txt,
        });
    };

    if (isLoadingChapter) return <Loading />;
    else if (errorChapter) return <div>Truy cập không được phép</div>
    else {
        return (
            <div
                className={cx("wrapper")}
                style={{ backgroundColor: customPageContent.bg }}
            >
                {checkUserVip ? (
                    <CustomReadChapter
                        clickColor={handleColorClick}
                        customPageContent={customPageContent}
                        setCustomPageContent={setCustomPageContent}
                    />
                ) : (
                    <></>
                )}
                <ChapterContent
                    item={chapter}
                    bookId={bookId}
                    custom={customPageContent}
                />
                <Comment ref={commentRef} id={chapId} path="/commentChapter" />
            </div>
        );
    }
}

export default ReadBook;
