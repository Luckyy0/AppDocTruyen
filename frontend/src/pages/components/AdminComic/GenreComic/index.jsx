import { useState, useEffect, useCallback } from "react";
import { ButtonAdmin, Popup, SearchComponent } from "../../../../components";
import styles from "./GenreComic.module.scss";
import classNames from "classnames/bind";
import privateApi from "../../../../api/PrivateApi";
import publicApi from "../../../../api/PublicApi";

const cx = classNames.bind(styles);

function AdminGenreComic() {
    const [inSearch, setInSearch] = useState("");
    const [label, setLabel] = useState("");
    const [popup, SetPopup] = useState(false);
    const [popupDelete, SetPopupDelete] = useState(false);
    const [popupChange, SetPopupChange] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [genres, setGenres] = useState([]);
    console.log(genres);

    // const handleEnterKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //         setLabel(inSearch);
    //         fetchGenres();
    //         setInSearch("");
    //     }
    // };
    const fetchGenres = useCallback(async () => {
        try {
            const response = await publicApi.get("/genre", {
                params: { search: inSearch },
            });
            setGenres(response.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    }, [inSearch]);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    const handleDeleteGenre = async () => {
        try {
            const apiResponse = await privateApi.delete(
                "/genre/" + popupData.id
            );
            SetPopupDelete(false);
            fetchGenres();
            console.log(apiResponse);
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    const handleUpdateGenre = async (data, setData) => {
        try {
            const apiData = await privateApi.put("/genre/" + popupData.id, {
                name: data[0]?.value,
            });
            setData([{ name: "Tên thể loại ", value: "" }]);
            SetPopupChange(false);
            fetchGenres();
            console.log(apiData);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };

    const handleAddGenre = async (data, setData) => {
        try {
            const apiData = await privateApi.post("/genre", {
                name: data[0]?.value,
            });
            setData([{ name: "Tên thể loại ", value: "" }]);
            SetPopup(false);
            fetchGenres();
            console.log(apiData);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        setLabel(inSearch);
    }, [inSearch]);
    return (
        <div>
            <div className={cx("wrapper", "row", "a-12")}>
                <div className={cx("content_1", "col", "a-3", "a-o-8")}>
                    <SearchComponent
                        // onkeydown={handleEnterKeyDown}
                        value={inSearch}
                        onChange={(e) => {
                            setInSearch(e.target.value);
                        }}
                    />
                </div>
                <div
                    className={cx("content_2", "col", "a-12", {
                        isShow: label,
                    })}
                >
                    Kết quả tìm kiếm cho: {label}
                </div>
                <div className={cx("content_3", "row", "a-12")}>
                    <table className={cx("table")}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Thể loại</th>
                                <th>Số lượng truyện</th>
                                <th>Lượt đọc</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>
                                            <span
                                                className={cx("change")}
                                                onClick={() => {
                                                    SetPopupChange(true);
                                                    setPopupData({ ...item });
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={cx("content_4", "col", "a-6", "a-o-3")}>
                    <ButtonAdmin
                        name="Thêm mới"
                        onClick={() => SetPopup(true)}
                    />
                </div>
            </div>
            {/* Popup add */}
            <Popup
                isShow={popup}
                onshow={() => SetPopup(false)}
                label={"Thêm thể loại"}
                actionName={"Xác nhận"}
                onAction={(data, setData) => handleAddGenre(data, setData)}
                dataArr={[{ name: "Tên thể loại ", value: "" }]}
            />
            {/* Popup delete */}
            <Popup
                isShow={popupDelete}
                onshow={() => SetPopupDelete(false)}
                label={
                    "Bạn có chắc muốn xóa thể loại có id là " +
                    popupData.id +
                    ", có tên là " +
                    popupData.name
                }
                actionName={"Xác nhận"}
                onAction={handleDeleteGenre}
                dataArr={[]}
            />
            {/* Popup change */}
            {popupChange && (
                <Popup
                    isShow={popupChange}
                    onshow={() => SetPopupChange(false)}
                    label={"Chỉnh sửa thể loại"}
                    actionName={"Xác nhận"}
                    dataArr={[
                        {
                            name: "Tên thể loại",
                            value: popupData?.name || "",
                        },
                    ]}
                    onAction={(data, setData) =>
                        handleUpdateGenre(data, setData)
                    }
                />
            )}
        </div>
    );
}

export default AdminGenreComic;
