import { useEffect, useState } from "react";
import {
    Popup,
    RadioWithLabel,
    SearchComponent,
    CustomPagnition,
} from "../../../../components";
import styles from "./UpdateComic.module.scss";
import classNames from "classnames/bind";
import publicApi from "../../../../api/PublicApi";
import privateApi from "../../../../api/PrivateApi";
import PopupUpdateComic from "./PopupUpdate";
import PopupChapter from "./PopupChapter";

const cx = classNames.bind(styles);

const SearchFilter = ["Id", "Tên", "Tác giả", "Thể loại"];
const SearchFilterName = ["id", "name", "author", "genres"];

function AdminUpdateComic() {
    const [inSearch, setInSearch] = useState("");
    const [searchBy, setSearchBy] = useState(0);
    const [label, setLabel] = useState("");
    const [popupData, setPopupData] = useState({});
    const [popupDelete, SetPopupDelete] = useState(false);
    const [popupUpdate, SetPopupUpdate] = useState(false);
    const [popupChapter, SetPopupChapter] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [comics, setComics] = useState([]);
    const [comic, setComic] = useState({});

    const handleEnterKeyDown = (e) => {
        if (e.key === "Enter") {
            const nd = inSearch ? inSearch : "tất cả";
            setLabel(
                "Bộ lọc tìm kiếm: " +
                    SearchFilter[searchBy] +
                    ", nội dung tìm kiếm: " +
                    nd
            );
            fetchComics();
        }
    };

    const handleDeleteComic = async () => {
        try {
            const apiResponse = await privateApi.delete(
                "/comic/" + popupData.id
            );
            SetPopupDelete(false);
            fetchComics();
            console.log(apiResponse);
            alert("Xóa thành công");
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    const fetchComics = async () => {
        try {
            console.log("-------------Start----------");
            console.log("Trang " + page);
            console.log("Filter " + SearchFilterName[searchBy]);
            console.log("search data " + inSearch);
            const response = await publicApi.get("/comic", {
                params: {
                    pageNumber: page,
                    searchBy: SearchFilterName[searchBy],
                    searchByData: inSearch,
                },
            });
            setComics(response.data.content);
            setTotalPage(response.data.totalPages);
            setPageSize(response.data.size);
            console.log(response);
            console.log("-------------End----------");
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    // update comic action
    const handleUpdateComic = async (data1) => {
        try {
            const responseApi = await privateApi.put(
                "/comic/" + comic.id,
                data1
            );
            console.log(responseApi);
            fetchComics();
            alert("Chỉnh sửa thành công");
            SetPopupUpdate(false);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    useEffect(() => {
        fetchComics();
    }, []);

    useEffect(() => {
        fetchComics();
    }, [page]);

    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className={cx("content_1", "row", "a-11", "a-o-1")}>
                <div className={cx("col", "a-8")}>
                    <RadioWithLabel
                        label="Tìm kiếm theo:"
                        data={SearchFilter}
                        indexValue={searchBy}
                        onGetData={(index) => setSearchBy(index)}
                    />
                </div>
                <div className={cx("col", "a-3")}>
                    <SearchComponent
                        onkeydown={handleEnterKeyDown}
                        value={inSearch}
                        onChange={(e) => setInSearch(e.target.value)}
                    />
                </div>
            </div>
            <div
                className={cx("content_2", "col", "a-12", {
                    isShow: label,
                })}
            >
                {label}
            </div>
            <div className={cx("content_3", "row", "a-12")}>
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Hình ảnh</th>
                            <th>Tác giả</th>
                            <th>Thể loại</th>
                            <th>DS.Chương</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comics.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <img
                                        className={cx("img")}
                                        src={item.image}
                                        alt="img"
                                    />
                                </td>
                                <td>{item.author.name}</td>
                                <td>
                                    {item.genres
                                        .map((it) => it.name)
                                        .toString()}
                                </td>
                                <td>
                                    <span
                                        className={cx("detail")}
                                        onClick={() => {
                                            SetPopupChapter(true);
                                            setComic({ ...item });
                                        }}
                                    >
                                        Chi tiết
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={cx("change")}
                                        onClick={() => {
                                            SetPopupUpdate(true);
                                            setComic({ ...item });
                                        }}
                                    >
                                        Sửa{" "}
                                    </span>
                                    |
                                    <span
                                        className={cx("delete")}
                                        onClick={() => {
                                            SetPopupDelete(true);
                                            setPopupData({ ...item });
                                        }}
                                    >
                                        {" "}
                                        Xóa
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx("content_4", "col", "a-11")}>
                <CustomPagnition
                    pageCount={totalPage}
                    pageRangeDisplayed={pageSize}
                    handlePageClick={(e) => setPage(e.selected)}
                    currentPage={page}
                />
            </div>
            {/* Popup delete */}
            <Popup
                isShow={popupDelete}
                onshow={() => SetPopupDelete(false)}
                label={
                    "Bạn có chắc muốn xóa truyên có id là " +
                    popupData.id +
                    ", có tên là " +
                    popupData.name
                }
                actionName={"Xác nhận"}
                onAction={handleDeleteComic}
                dataArr={[]}
            />
            {/* Popup update */}
            {popupUpdate && (
                <PopupUpdateComic
                    isShow={popupUpdate}
                    onshow={() => SetPopupUpdate(false)}
                    item={comic}
                    onAction={(data1) => handleUpdateComic(data1)}
                />
            )}
            {/* Popup Chapter */}
            {popupChapter && (
                <PopupChapter
                    isShow={popupChapter}
                    onshow={() => SetPopupChapter(false)}
                    item={comic}
                    onAction={() => {}}
                />
            )}
        </div>
    );
}

export default AdminUpdateComic;
