import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import publicApi from "../../../api/PublicApi";
import { CustomPagnition, Loading } from "../../../components";
import styles from "./NominatedComic.module.scss";
import NominatedComicItem from "./NominatedComicItem";
import useGetProfile from "../../../hook/useGetProfile";
import privateApi from "../../../api/PrivateApi";

const cx = classNames.bind(styles);
const NOMINATED_PAGE_SIZE = 4;

function NominatedComic() {
    const [comics, setComics] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(NOMINATED_PAGE_SIZE);
    const [totalPage, setTotalPage] = useState(1);
    const { profile, isLoadingProfile } = useGetProfile();
    const fetchData = async () => {
        try {
            let response;
            if (profile.username) {
                response = await privateApi.get("/nominatedcomic", {
                    params: {
                        pageNumber: page,
                        pageSize: NOMINATED_PAGE_SIZE,
                    },
                });
            } else {
                response = await publicApi.get("/comic", {
                    params: {
                        pageNumber: page,
                        pageSize: NOMINATED_PAGE_SIZE,
                    },
                });
            }

            setComics(response.data.content);
            setTotalPage(response.data.totalPages);
            setPageSize(response.data.size);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    useEffect(() => {
        fetchData();
    }, [page,isLoadingProfile]);

    if (isLoadingProfile) return <Loading/>;
    else {
        return (
            <div className={cx("wrapper")}>
                <div>
                    <p className={cx("label", "col", "a-1")}>Truyện đề cử</p>
                </div>
                <div className={cx("main", "row")}>
                    {comics.map((item) => (
                        <div key={item.id} className="col a-6">
                            <NominatedComicItem item={item} />
                        </div>
                    ))}
                </div>
                <div className="a-12">
                    <CustomPagnition
                        pageCount={totalPage}
                        pageRangeDisplayed={pageSize}
                        handlePageClick={(e) => setPage(e.selected)}
                        currentPage={page}
                    />
                </div>
            </div>
        );
    }
}

export default NominatedComic;
