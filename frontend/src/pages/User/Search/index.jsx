import { NominatedComicItem } from "../../components";
import styles from "./search.module.scss";
import classNames from "classnames/bind";
import { actions, useStore } from "../../../context/store";
import { memo, useState, useEffect } from "react";
import publicApi from "../../../api/PublicApi";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

const orderBy = [
    "Lượt đọc",
    "Mới cập nhật",
    "Lượt thích",
    "Lượt Theo dõi",
    "Ngẫu nhiên",
];

const sortBy = ["view", "chapter", "like", "follow", "random"];

const comicStatus = {'Hoàn thành': 'COMPLETE','Đang ra':'IN_PROGRESS'}

function Search() {
    let { "*": param } = useParams();
    const [searchFilter, dispatch] = useStore();
    const {
        userSearchFilterState,
        userSearchOrder,
        userSearchFilterGenre,
        userSearchFilterChap,
    } = searchFilter;
    const [comics, setComics] = useState([]);

    // const fetchComics = async () => {
    //     try {
    //         const response = await publicApi.get("/comic", {
    //             params: {
    //                 pageNumber: 0,
    //                 inSearch: param,
    //                 status: userSearchFilterState,
    //                 sortBy: sortBy[userSearchOrder],
    //                 genre: [...userSearchFilterGenre],
    //                 minChapter: userSearchFilterChap?.split(/\+| - /)[0] || "",
    //                 maxChapter: userSearchFilterChap?.split(/\+| - /)[1] || "",
    //             },
    //         });
    //         setComics(response.data.content);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error.response?.data?.message || "Có lỗi xảy ra");
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await publicApi.get("/comic", {
                    params: {
                        pageNumber: 0,
                        inSearch: param,
                        status: userSearchFilterState?comicStatus[userSearchFilterState]:'IN_PROGRESS',
                        sortBy: sortBy[userSearchOrder],
                        genre: [...userSearchFilterGenre],
                        minChapter:
                            userSearchFilterChap?.split(/\+| - /)[0] || "",
                        maxChapter:
                            userSearchFilterChap?.split(/\+| - /)[1] || "",
                    },paramsSerializer
                });
                setComics(response.data.content);
                // console.log(response.data);
            } catch (error) {
                console.log(error.response?.data?.message || "Có lỗi xảy ra");
            }
        };
        fetchData();
    }, [userSearchFilterState,userSearchOrder,userSearchFilterGenre,userSearchFilterChap,param]);
    console.log(comics);

    const paramsSerializer = (params) => {
        return Object.keys(params)
          .map(key => {
            if (Array.isArray(params[key])) {
              return params[key].map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
          })
          .join('&');
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
            <div className={cx("content_2", "row")}>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>

                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
            </div>
        </div>
    );
}

export default memo(Search);
