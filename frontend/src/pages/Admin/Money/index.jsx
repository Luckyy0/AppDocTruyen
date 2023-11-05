import styles from "./Money.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function AdminMoney() {
    return (
        <div>
            <div className={cx("wrapper", "row", "a-12")}>
                <div className={cx("content_1", "col", "a-3", "a-o-8")}>
                    Doanh thu theo: Tháng
                </div>
                <div className={cx("content_3", "row", "a-12")}>
                    <table className={cx("table")}>
                        <thead>
                            <tr>
                                <th>Tháng</th>
                                <th>Năm</th>
                                <th>Doanh thu</th>
                                <th>Nội dung</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2023</td>
                                <td>3.000.000 vnđ</td>
                                <td>
                                    <span
                                        className={cx("detail")}
                                        // onClick={() => SetPopupChange(true)}
                                    >
                                        Chi tiết
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminMoney;
