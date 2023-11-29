import styles from "./FeeComic.module.scss";
import classNames from "classnames/bind";
import FeeComicItem from "./FeeComicItem/FeeComicItem";
import publicApi from "../../../api/PublicApi";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function FeeComic() {
    const [comics, setComics] = useState([]);
    const fetchData = async () => {
        try {
            const response = await publicApi.get("/comic", {
                params: {
                    pageNumber: 0,
                    pageSize: 8,
                    typeComic: 'PAID'
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
                <p className={cx("label", "col", "a-2")}> Truyện trả phí </p>
            </div>
            <div className={cx("content", "row", " a-o-1", "a-10")}>
                {comics.map((item) => (
                    <div key={item.id} className="col a-3">
                        <FeeComicItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeeComic;
