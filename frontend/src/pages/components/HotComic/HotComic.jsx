import styles from "./HotComic.module.scss";
import classNames from "classnames/bind";
import HotComicItem from "./HotComicItem";
import publicApi from "../../../api/PublicApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function HotComic() {
    const [comics, setComics] = useState([]);
    const fetchData = async () => {
        try {
            const response = await publicApi.get("/hotcomic", {
                params: {
                    pageNumber: 0,
                    pageSize: 9,
                },
            });
            setComics(response.data.content);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    console.log(comics);
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-1")}>Truyện hot</p>
            </div>

            <div className={cx("content", "row", " a-o-1", "a-10")}>
                {comics
                    .filter((item, index) => index === 0)
                    .map((item, index) => (
                        <div key={item.id} className={cx("col", "a-4","it")}>
                            <HotComicItem item={item} index={index} />
                        </div>
                    ))}
                <div className={cx("col", "a-8", "row", "content-1")}>
                    {comics
                        .filter((item, index) => index !== 0)
                        .map((item, index) => (
                            <div key={item.id} className="col a-3">
                                <HotComicItem item={item} index={index + 1} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default HotComic;
