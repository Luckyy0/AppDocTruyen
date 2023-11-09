import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import publicApi from "../../../../api/PublicApi";
import { ButtonAdmin, Popup, SearchComponent } from "../../../../components";
import styles from "./BrowserComic.module.scss";
import privateApi from "../../../../api/PrivateApi";

const cx = classNames.bind(styles);

function AdminBrowserComic() {
    const [inSearch, setInSearch] = useState("");
    const [label, setLabel] = useState("");
    const [popup, SetPopup] = useState(false);
    const [popupDelete, SetPopupDelete] = useState(false);
    const [popupChange, SetPopupChange] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [authors, setAuthors] = useState([]);
    console.log(popupData);

    const fetchAuthors = useCallback(async () => {
        try {
            const response = await publicApi.get("/author", {
                params: { search: inSearch },
            });
            setAuthors(response.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    }, [inSearch]);

    useEffect(() => {
        fetchAuthors();
    }, [fetchAuthors]);

    useEffect(()=>{
        setLabel(inSearch)
    },[inSearch])

    // const handleEnterKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //         setLabel(inSearch);
    //         setInSearch("");
    //     }
    // };
    const handleUpdateAuthor = async (data, setData) => {
        try {
            const apiData = await privateApi.put("/author/" + popupData.id, {
                name: data[0]?.value,
                description: data[1]?.value,
            });
            setData([
                { name: "Tên tác giả", value: "" },
                { name: "Thông tin mô tả", value: "" },
            ]);
            SetPopupChange(false);
            fetchAuthors();
            console.log(apiData);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };
    const handleDeleteAuthor = async () => {
        try {
            const apiResponse = await privateApi.delete(
                "/author/" + popupData.id
            );
            SetPopupDelete(false);
            fetchAuthors();
            console.log(apiResponse);
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    const handleAddAuthor = async (data, setData) => {
        try {
            const apiResponse = await privateApi.post("/author", {
                name: data[0]?.value,
                description: data[1]?.value,
            });
            setData([
                { name: "Tên tác giả", value: "" },
                { name: "Thông tin mô tả", value: "" },
            ]);
            SetPopup(false);
            fetchAuthors();
            console.log(apiResponse);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };

    return (
        <div>
            <div className={cx("wrapper", "row", "a-12")}>
                <div className={cx("content_1", "col", "a-3", "a-o-8")}>
                    <SearchComponent
                        // onkeydown={handleEnterKeyDown}
                        value={inSearch}
                        onChange={(e) => setInSearch(e.target.value)}
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
                                <th>Tác giả</th>
                                <th>Số lượng truyện</th>
                                <th>Lượt đọc</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((item) => {
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
                label={"Thêm tác giả"}
                actionName={"Xác nhận"}
                dataArr={[
                    { name: "Tên tác giả", value: "" },
                    { name: "Thông tin mô tả", value: "" },
                ]}
                onAction={(data, setData) => handleAddAuthor(data, setData)}
            />
            {/* Popup delete */}
            <Popup
                isShow={popupDelete}
                onshow={() => SetPopupDelete(false)}
                label={
                    "Bạn có chắc muốn xóa tác giả có id là: " +
                    popupData.id +
                    ", có tên là: " +
                    popupData.name +
                    ", có mô tả như sau: " +
                    popupData.description
                }
                actionName={"Xác nhận"}
                onAction={handleDeleteAuthor}
                dataArr={[]}
            />
            {/* Popup change */}
            {popupChange && <Popup
                isShow={popupChange}
                onshow={() => SetPopupChange(false)}
                label={"Chỉnh sửa Thông tin tác giả"}
                actionName={"Xác nhận"}
                dataArr={[
                    { name: "Tên tác giả", value: popupData?.name||"" },
                    { name: "Thông tin mô tả", value: popupData?.description||"" },
                ]}
                onAction={(data, setData) => handleUpdateAuthor(data, setData)}
            />}
        </div>
    );
}

export default AdminBrowserComic;
