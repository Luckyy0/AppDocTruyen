import styles from "./NewUpdateComic.module.scss";
import classNames from "classnames/bind";
import NewUpdateComicItem from "./NewUpdateComicItem";
import { useEffect, useState } from "react";
import publicApi from "../../../api/PublicApi";
import { actions, useStore } from "../../../context/store";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function NewUpdateComic() {
    const [, dispatch] = useStore();
    const [chapters, setChapters] = useState([]);
    const navigate = useNavigate();
    const fetchChapters = async () => {
        try {
            const response = await publicApi.get("/chapter", {
                params: {
                    sort: "DESC",
                    pagenumber: 0,
                },
            });
            setChapters(response.data.content);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    
    useEffect(() => {
        fetchChapters();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className="row a-12">
                <p className={cx("label", "col", "a-2")}>Truyện mới cập nhật</p>
                <p
                    className={cx("all", "col", "a-2", "a-o-7")}
                    onClick={() => {
                        dispatch(actions.setUserFilterSearchReset());
                        dispatch(actions.setUserSearchOrder(1));
                        navigate("/search");
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    Xem tất cả
                </p>
            </div>
            {chapters.slice(0,7).map((item) => (
                <div key={item.chapId} className="col a-12">
                    <NewUpdateComicItem item={item} />
                </div>
            ))}
        </div>
    );
}

export default NewUpdateComic;
