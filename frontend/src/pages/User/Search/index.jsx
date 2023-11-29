import { NominatedComicItem } from "../../components";
import styles from "./search.module.scss";
import classNames from "classnames/bind";
import { actions, useStore } from "../../../context/store";
import { memo, useState, useEffect } from "react";
import publicApi from "../../../api/PublicApi";
import { useParams } from "react-router-dom";
import { CustomPagnition } from "../../../components";
const cx = classNames.bind(styles);

const orderBy = [
    "Lượt đọc",
    "Mới cập nhật",
    "Lượt thích",
    "Lượt Theo dõi",
    "Ngẫu nhiên",
];

const sortBy = ["view", "chapter", "like", "follow", "random"];

const comicStatus = { "Hoàn thành": "COMPLETE", "Đang ra": "IN_PROGRESS" };

const typeComic = { "Miễn phí": "FREE", "Trả phí": "PAID" };
const NOMINATED_PAGE_SIZE = 12;
function Search() {
    let { "*": param } = useParams();
    const [searchFilter, dispatch] = useStore();
    const {
        userSearchFilterState,
        userSearchOrder,
        userSearchFilterGenre,
        userSearchFilterChap,
        userSearchFilterType,
    } = searchFilter;
    const [comics, setComics] = useState([]);
    const [isLoadingComics, setIsLoadingComics] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(NOMINATED_PAGE_SIZE);
    const [totalPage, setTotalPage] = useState(1);

    const fetchData = async (pg = page) => {
        try {
            const response = await publicApi.get("/comic", {
                params: {
                    pageNumber: pg,
                    pageSize: NOMINATED_PAGE_SIZE,
                    inSearch: param,
                    status: userSearchFilterState
                        ? comicStatus[userSearchFilterState]
                        : "",
                    sortBy: sortBy[userSearchOrder],
                    genre: [...userSearchFilterGenre],
                    typeComic: userSearchFilterType
                        ? typeComic[userSearchFilterType]
                        : "",
                    minChapter: userSearchFilterChap?.split(/\+| - /)[0] || "",
                    maxChapter: userSearchFilterChap?.split(/\+| - /)[1] || "",
                },
                paramsSerializer,
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
        setPage(0)
        fetchData(0);
    }, [searchFilter, param]);

    useEffect(() => {
        fetchData();
    }, [page]);

    const paramsSerializer = (params) => {
        return Object.keys(params)
            .map((key) => {
                if (Array.isArray(params[key])) {
                    return params[key]
                        .map(
                            (value) =>
                                `${encodeURIComponent(
                                    key
                                )}=${encodeURIComponent(value)}`
                        )
                        .join("&");
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(
                    params[key]
                )}`;
            })
            .join("&");
    };
    return (
        <div className={cx("wrapper", "col", "a-12")}>
            <div className={cx("content_1")}>
                {orderBy.map((item, index) => (
                    <div
                        key={index}
                        className={cx("item", {
                            isActive: index === userSearchOrder,
                        })}
                        onClick={() => {
                            dispatch(actions.setUserSearchOrder(index));
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {isLoadingComics ? (
                <></>
            ) : (
                <div className={cx("content_2", "row")}>
                    {comics.map((item) => (
                        <div key={item.id} className="col a-6">
                            <NominatedComicItem item={item} />
                        </div>
                    ))}
                    <div className="a-12">
                        <CustomPagnition
                            pageCount={totalPage}
                            pageRangeDisplayed={pageSize}
                            handlePageClick={(e) => setPage(e.selected)}
                            currentPage={page}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(Search);
