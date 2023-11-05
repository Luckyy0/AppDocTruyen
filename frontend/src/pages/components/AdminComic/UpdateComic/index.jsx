import { useState } from "react";
import { Popup, SearchComponent } from "../../../../components";
import styles from "./UpdateComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminUpdateComic() {
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
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Hình ảnh</th>
                            <th>Tác giả</th>
                            <th>Thể loại</th>
                            <th>Lượt đọc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Một con vịt</td>
                            <td>abshfd</td>
                            <td>Duc Manh</td>
                            <td>Kiếm hiệp, Xuyên không, Đô thị</td>
                            <td>1.000.000</td>
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
                label={"Cập nhật thông tin truyện"}
                actionName={"Xác nhận"}
                dataArr={[
                    {name:"Tên",value:"Một con vịt"},
                    {name:"hình ảnh",value:"abshfd"},
                    {name:"Tác giả",value:"Duc Manh"},
                    {name:"Thể loại",value:"Kiếm hiệp, Xuyên không, Đô thị	"},
                    {name:"Mô tả",value:"truyện kể về....."},
                ]}
            />
        </div>
    );
}

export default AdminUpdateComic;
