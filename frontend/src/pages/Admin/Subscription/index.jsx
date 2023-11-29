import styles from "./subscription.module.scss";
import classNames from "classnames/bind";
import { ButtonAdmin, Popup, SearchComponent } from "../../../components";
import { useCallback, useEffect, useState } from "react";
import privateApi from "../../../api/PrivateApi";
import publicApi from "../../../api/PublicApi";
const cx = classNames.bind(styles);

function Subscription() {
    const [inSearch, setInSearch] = useState("");
    const [label, setLabel] = useState("");
    const [popup, SetPopup] = useState(false);
    // const [popupDelete, SetPopupDelete] = useState(false);
    const [popupChange, SetPopupChange] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [subscriptions, setSubscriptions] = useState([]);
    console.log(subscriptions);

    const fetchSubscriptions = useCallback(async () => {
        try {
            const response = await publicApi.get("/subscription", {
                params: { search: inSearch },
            });
            setSubscriptions(response.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    }, [inSearch]);

    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    // const handleDeleteGenre = async () => {
    // try {
    //     const apiResponse = await privateApi.delete(
    //         "/subscription/" + popupData.id
    //     );
    //     SetPopupDelete(false);
    //     fetchSubscriptions();
    //     console.log(apiResponse);
    // } catch (error) {
    //     alert("Có lỗi xảy ra, vui lòng thử lại sau");
    // }
    // };

    const handleUpdateSubscription = async (data, setData) => {
        try {
            const apiData = await privateApi.put(
                "/subscription/" + popupData.id,
                {
                    description: data[0]?.value,
                    price: parseFloat(data[1]?.value),
                }
            );
            setData([
                { name: "Mô tả ", value: "" },
                { name: "Giá gói ", value: "" },
            ]);
            SetPopupChange(false);
            fetchSubscriptions();
            console.log(apiData);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };

    const handleAddSubscription = async (data, setData) => {
        try {
            const apiData = await privateApi.post("/subscription", {
                description: data[1]?.value,
                duration: parseFloat(data[0]?.value),
                price: parseFloat(data[2]?.value),
            });
            setData([
                { name: "Thời hạn gói ", value: "" },
                { name: "Mô tả ", value: "" },
                { name: "Giá gói ", value: "" },
            ]);
            SetPopup(false);
            fetchSubscriptions();
            alert("Thêm thành công");
            console.log(apiData);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
                alert("Vui lòng nhập đầy đủ và đúng định dạng dữ liệu");
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
                        hint={"Tìm kiếm theo thời hạn gói......"}
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
                    {parseFloat(inSearch) ? (
                        <p>Kết quả tìm kiếm cho: {label}</p>
                    ) : (
                        <p>Vui lòng nhập số</p>
                    )}
                </div>
                <div className={cx("content_3", "row", "a-12")}>
                    <table className={cx("table")}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Thời hạn(tháng)</th>
                                <th>Giá gói</th>
                                <th>Mô tả</th>
                                <th>Số lượt mua</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.duration}</td>
                                        <td>{item.price}.000 vnđ</td>
                                        <td>{item.description}</td>
                                        <td>{item.purchases}</td>
                                        <td>
                                            <span
                                                className={cx("change")}
                                                onClick={() => {
                                                    SetPopupChange(true);
                                                    setPopupData({ ...item });
                                                }}
                                            >
                                                Sửa
                                            </span>
                                            {/* |
                                            <span
                                                className={cx("delete")}
                                                onClick={() => {
                                                    SetPopupDelete(true);
                                                    setPopupData({ ...item });
                                                }}
                                            >
                                                {" "}
                                                Xóa
                                            </span> */}
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
                label={"Thêm gói đăng ký"}
                actionName={"Xác nhận"}
                onAction={(data, setData) =>
                    handleAddSubscription(data, setData)
                }
                dataArr={[
                    { name: "Thời hạn gói ", value: "" },
                    { name: "Mô tả ", value: "" },
                    { name: "Giá gói ", value: "" },
                ]}
            />
            {/* Popup delete
            <Popup
                isShow={popupDelete}
                onshow={() => SetPopupDelete(false)}
                label={
                    "Bạn có chắc muốn xóa gói đăng ký có id là " +
                    popupData.id +
                    ", có tên là " +
                    popupData.name
                }
                actionName={"Xác nhận"}
                onAction={handleDeleteGenre}
                dataArr={[]}
            /> */}
            {/* Popup change */}
            {popupChange && (
                <Popup
                    isShow={popupChange}
                    onshow={() => SetPopupChange(false)}
                    label={
                        "Chỉnh sửa gói đăng ký " +
                        popupData?.duration +
                        " tháng"
                    }
                    actionName={"Xác nhận"}
                    dataArr={[
                        { name: "Mô tả ", value: popupData?.description || "" },
                        { name: "Giá gói ", value: popupData?.price || "" },
                    ]}
                    onAction={(data, setData) =>
                        handleUpdateSubscription(data, setData)
                    }
                />
            )}
        </div>
    );
}

export default Subscription;
