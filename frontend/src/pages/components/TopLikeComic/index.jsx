import styles from "./TopLikeComic.module.scss";
import classNames from "classnames/bind";
import TopLikeComicItem from "./TopLikeComicItem";
import { CustomPagnition } from "../../../components";
import { useState, useEffect } from "react";
import publicApi from "../../../api/PublicApi";
import { TOP_PAGE_SIZE } from "../../../utils/constants";

const cx = classNames.bind(styles);

function TopLikeComic() {
    const [comics, setComics] = useState([]);
    const [isLoadingComics, setIsLoadingComics] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(TOP_PAGE_SIZE);
    const [totalPage, setTotalPage] = useState(1);
    const fetchData = async () => {
        try {
            const response = await publicApi.get("/comic", {
                params: {
                    pageNumber: page,
                    pageSize: pageSize,
                    sortBy: "like",
                },
            });
            setComics(response.data.content);
            setTotalPage(response.data.totalPages);
            setPageSize(response.data.size);
            setIsLoadingComics(false);
        } catch (error) {
            setIsLoadingComics(false);
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [page]);
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>
                    Top truyện yêu thích
                </p>
            </div>
            {isLoadingComics ? (
                <></>
            ) : (
                <div className="row">
                    {comics.map((item, index) => (
                        <div key={item.id} className="col a-10 a-o-1">
                            <TopLikeComicItem
                                index={index + 1 + page * TOP_PAGE_SIZE}
                                item={item}
                            />
                        </div>
                    ))}
                    <div className="a-12">
                        <CustomPagnition
                            pageCount={totalPage}
                            pageRangeDisplayed={pageSize}
                            handlePageClick={(e) => {
                                setPage(e.selected);
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "instant",
                                });
                            }}
                            currentPage={page}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopLikeComic;
