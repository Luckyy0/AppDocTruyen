import { useState } from "react";
import { ButtonAdmin, Popup, SearchComponent } from "../../../../components";
import styles from "./GenreComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminGenreComic() {
    const [inSearch, setInSearch] = useState("dsd");
    const [label, setLabel] = useState("");
    const [popup, SetPopup] = useState(false);
    const [popupDelete, SetPopupDelete] = useState(false);
    const [popupChange, SetPopupChange] = useState(false);

    const handleEnterKeyDown = (e) => {
        if (e.key === "Enter") {
            setLabel(inSearch);
            setInSearch("");
        }
    };

    return (
        <div>
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
                                <th>Id</th>
                                <th>Thể loại</th>
                                <th>Số lượng truyện</th>
                                <th>Lượt đọc</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Kiếm hiệp</td>
                                <td>80</td>
                                <td>1.800.000</td>
                                <td>
                                    <span
                                        className={cx("change")}
                                        onClick={() => SetPopupChange(true)}
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
                dataArr={[{ name: "Tên thể loại", value: "" }]}
            />
            {/* Popup delete */}
            <Popup
                isShow={popupDelete}
                onshow={() => SetPopupDelete(false)}
                label={"Bạn có chắc muốn xóa"}
                actionName={"Xác nhận"}
                dataArr={[]}
            />
            {/* Popup change */}
            <Popup
                isShow={popupChange}
                onshow={() => SetPopupChange(false)}
                label={"Chỉnh sửa thể loại"}
                actionName={"Xác nhận"}
                dataArr={[{ name: "Tên thể loại", value: "" }]}
            />
        </div>
    );
}

export default AdminGenreComic;
