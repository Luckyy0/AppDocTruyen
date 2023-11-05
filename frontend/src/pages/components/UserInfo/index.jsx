import { ButtonAdmin } from "../../../components";
import styles from "./UserInfo.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UserInfo() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content_1")}>
                <p className={cx("label", "col", "a-3")}>
                    Thông tin người dùng
                </p>
            </div>
            <div className={cx("content_2", "col", "a-12")}>
                <div className={cx("main_info","col","a-12")}>
                    <div className={cx("image")}>Image</div>
                    <div className={cx("main_info-item")}>Duc Manh</div>
                    <div className={cx("main_info-item")}>Vuducmanh@gmail.com</div>
                    <div className={cx("main_info-item")}>Thành viên</div>
                </div>
                <div className={cx("des","col","a-8","a-o-2")}>Mô tả: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, aut numquam cupiditate eum ducimus illum, facere animi tempore aliquam perferendis quaerat saepe, harum modi! Vel facilis velit nam cupiditate qui?</div>
                <div className={cx("sub_info","col","a-8","a-o-2")}>
                    <div className={cx("item")}>First name: Mạnh</div>
                    <div className={cx("item")}>Last name: Vũ</div>
                    <div className={cx("item")}>Số điện thoại: 0123456789</div>
                    <div className={cx("item")}>Giới tính: Nam</div>
                    <div className={cx("item")}>Năm sinh: 2001</div>
                    <div className={cx("item")}>Thời hạn gói đăng ký: 15h30' 26/12/2023</div>
                </div>
            </div>
            <div className={cx('content_3',"col","a-8","a-o-2")}>
                <ButtonAdmin name={"Chỉnh sửa thông tin"}/>
                <ButtonAdmin name={"Mua gói đăng ký"}/>
            </div>
        </div>
    );
}

export default UserInfo;
