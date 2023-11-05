import { Link } from "react-router-dom";
import {
    InputWithLabel,
    TextAreaWithLabel,
} from "../../../../components";
import styles from "./UpdateComicPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminUpdateComicPage() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <div className={cx("label", "col", "a-12")}>
                {" "}
                Cập nhật nội dung truyện
            </div>
            <div className={cx("content", "col", "a-11")}>
                <InputWithLabel label={"Hình ảnh"} />
                <InputWithLabel label={"Tên truyện"} />
                <TextAreaWithLabel label={"Mô tả truyện"} />
                <InputWithLabel label={"Tác giả"} />
                <InputWithLabel label={"Thể loại"} />
            </div>
            <div className={cx("button", "row", "a-10","a-o-1")}>
                <Link className={cx("col", "a-5","a-o-1")} to={"/admin"}>Quay lại</Link>
                <Link className={cx("col", "a-5","a-o-1")} to={"/admin"}> Xác nhận</Link>
            </div>
        </div>
    );
}

export default AdminUpdateComicPage;
