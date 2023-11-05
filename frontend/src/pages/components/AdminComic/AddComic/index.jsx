import { ButtonAdmin, TextAreaWithLabel } from "../../../../components";
import InputWithLabel from "../../../../components/InputWithLabel";
import styles from "./AddComic.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminAddComic() {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <p className={cx("label", "col", "a-12")}>Thêm truyện</p>
            <div className={cx("col", "a-10")}>
                <InputWithLabel label={"Hình ảnh"} />
            </div>
            <div className={cx("col", "a-10")}>
                <InputWithLabel label={"Tên truyện"} />
            </div>

            <div className={cx("col", "a-10")}>
                <TextAreaWithLabel label={"Mô tả"} />
            </div>
            <div className={cx("col", "a-10")}>
                <InputWithLabel label={"Tác giả"} />
            </div>
            <div className={cx("col", "a-10")}>
                <InputWithLabel label={"Thể loại"} />
            </div>
            <div className={cx("col","a-10","a-o-2","button")}>
                <ButtonAdmin name={"Thêm truyện"} />
            </div>
        </div>
    );
}

export default AdminAddComic;
