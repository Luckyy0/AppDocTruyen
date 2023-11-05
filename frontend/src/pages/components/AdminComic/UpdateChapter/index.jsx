import styles from "./UpdateChapter.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { Popup, SearchComponent } from "../../../../components";

const cx = classNames.bind(styles);

function AdminUpdateChapter() {
    const [inSearch, setInSearch] = useState("dsd");
    const [label, setLabel] = useState("");
    const [popupDelete, SetPopupDelete] = useState(false);
    const [popupUpdate, SetPopupUpdate] = useState(false);

    const handleEnterKeyDown = (e) => {
        if (e.key === "Enter") {
            setLabel(inSearch);
            setInSearch("");
        }
    };
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className={cx("content_1", "col", "a-3", "a-o-8")}>
                <SearchComponent
                    onkeydown={handleEnterKeyDown}
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
                            <th>Chương số</th>
                            <th>Tiêu đề</th>
                            <th>Truyện ID</th>
                            <th>Thời gian cập nhật</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Sự khởi đầu</td>
                            <td>2</td>
                            <td>5 phút trước</td>
                            <td>
                                <span
                                    className={cx("change")}
                                    onClick={() => SetPopupUpdate(true)}
                                >
                                    Sửa{" "}
                                </span>
                                |
                                <span
                                    className={cx("delete")}
                                    onClick={() => SetPopupDelete(true)}
                                >
                                    {" "}
                                    Xóa
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Popup delete */}
            <Popup
                isShow={popupDelete}
                onshow={() => SetPopupDelete(false)}
                label={"Bạn có chắc muốn xóa"}
                actionName={"Xác nhận"}
                dataArr={[]}
            />
            {/* Popup update */}
            <Popup
                isShow={popupUpdate}
                onshow={() => SetPopupUpdate(false)}
                label={"Cập nhật thông tin chương"}
                actionName={"Xác nhận"}
                dataArr={[
                    { name: "Chương số", value: "1" },
                    { name: "Tiêu đề", value: "Sự khởi đầu" },
                    { name: "Truyện Id", value: "2" },
                    {
                        name: "Nội dung",
                        value: "Mô tả mô tả mô tả mô tả	",
                    },
                ]}
            />
        </div>
    );
}

export default AdminUpdateChapter;
