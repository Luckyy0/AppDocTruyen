import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import privateApi from "../../../api/PrivateApi";
import {
    ButtonAdmin,
    InputWithLabel,
    RadioWithLabel,
    TextAreaWithLabel,
    Toast,
} from "../../../components";
import styles from "./UserInfo.module.scss";
import { getExpirationSubscription } from "../../../utils/CommonFunction";
import { useAuth } from "../../../hook/useAuth";
import { TOAST } from "../../../utils/constants";

const cx = classNames.bind(styles);
const Gender = ["MALE", "FEMALE", "ORTHER"];

function UserInfo() {
    const { auth, setAuth } = useAuth();
    const [profile, setProfile] = useState({});
    const [checkUserVip, setCheckUserVip] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [subscription, setSubscription] = useState();
    const [toastInfo, setToastInfo] = useState({
        isShow: false,
        label: TOAST.ERROR,
        content: "",
    });
    console.log(profile);
    const fetchProfile = async () => {
        try {
            const response = await privateApi.get("/profile");
            setProfile(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseApi = await privateApi.get("/checksubscription");
                console.log(responseApi.data);
                setSubscription(
                    getExpirationSubscription(
                        responseApi.data.createAt,
                        responseApi.data.subscription.duration
                    )
                );
            } catch (error) {
                setSubscription("Hiện tại chưa sử dụng gói thành viên");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseApi = await privateApi.get("/checkuser");
                setCheckUserVip(responseApi.data.status);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const handleUpdate = async () => {
        setToastInfo({
            ...toastInfo,
            isShow: false,
            content: "",
            label: TOAST.INFO,
        });
        try {
            let data = {};
            if (profile.firstName) {
                data = { ...data, firstName: profile.firstName };
            }
            if (profile.lastName) {
                data = { ...data, lastName: profile.lastName };
            }
            if (profile.image) {
                data = { ...data, image: profile.image };
            }
            if (profile.phone) {
                data = { ...data, phoneNumber: profile.phone };
            }
            if (profile.description) {
                data = { ...data, description: profile.description };
            }
            if (profile.year) {
                data = { ...data, year: parseInt(profile.year) };
            }
            if (profile.gender) {
                data = { ...data, gender: profile.gender };
            }
            await privateApi.post("/profile", data);
            setAuth({ ...auth, image: profile.image });
            setToastInfo({
                ...toastInfo,
                isShow: true,
                content: "Thay đổi thành công",
                label: TOAST.SUCCESS,
            });
            fetchProfile();
        } catch (error) {
            console.log(error.response.data);
            setToastInfo({
                ...toastInfo,
                isShow: true,
                content: "Vui lòng nhập đúng định dạng dữ liệu",
                label: TOAST.WARRNING,
            });
        }
    };
    if (isLoading) return <div>Loading . . .</div>;
    else {
        return (
            <div className={cx("wrapper")}>
                {toastInfo.isShow && (
                    <Toast
                        label={toastInfo.label}
                        content={toastInfo.content}
                    />
                )}
                <div className={cx("content_1")}>
                    <p className={cx("label", "col", "a-3")}>
                        Thông tin người dùng
                    </p>
                </div>
                <div className={cx("content_2", "col", "a-12")}>
                    <div className={cx("main_info", "col", "a-12")}>
                        <div className={cx("image")}>
                            <img
                                className={cx("image_content")}
                                src={profile.image}
                                alt="ig"
                            />
                        </div>
                        <div className={cx("main_info-item")}>
                            {profile.username}
                        </div>
                        <div className={cx("main_info-item")}>
                            {profile.email}
                        </div>
                        <div className={cx("main_info-item")}>
                            Thành viên {checkUserVip ? "Vip" : "thường"}
                        </div>
                    </div>
                    <div className={cx("sub_info", "col", "a-8", "a-o-2")}>
                        <InputWithLabel
                            label={"Hình ảnh"}
                            value={profile?.image || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    image: e.target.value,
                                })
                            }
                            color="rgb(206, 21, 157)"
                            bg="white"
                        />
                        <InputWithLabel
                            label={"First name"}
                            value={profile?.firstName || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    firstName: e.target.value,
                                })
                            }
                            color="rgb(206, 21, 157)"
                            bg="white"
                        />
                        <InputWithLabel
                            label={"Last name"}
                            value={profile?.lastName || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    lastName: e.target.value,
                                })
                            }
                            color="rgb(206, 21, 157)"
                            bg="white"
                        />
                        <InputWithLabel
                            label={"Số điện thoại"}
                            value={profile?.phone || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    phone: e.target.value,
                                })
                            }
                            color="rgb(206, 21, 157)"
                            bg="white"
                        />
                        <RadioWithLabel
                            label={"Giới tính"}
                            data={Gender}
                            indexValue={Gender.indexOf(profile.gender)}
                            onGetData={(index) =>
                                setProfile({
                                    ...profile,
                                    gender: Gender[index],
                                })
                            }
                            color="rgb(206, 21, 157)"
                        />
                        <InputWithLabel
                            label={"Năm sinh"}
                            value={profile?.year || ""}
                            onChange={(e) =>
                                setProfile({ ...profile, year: e.target.value })
                            }
                            color="rgb(206, 21, 157)"
                            bg="white"
                        />
                        <TextAreaWithLabel
                            label={"Mô tả"}
                            value={profile?.description || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    description: e.target.value,
                                })
                            }
                            color="rgb(206, 21, 157)"
                            bg="white"
                        />
                        <div
                            className={cx("item")}
                            style={{ color: "rgb(206, 21, 157)" }}
                        >
                            Thời hạn gói đăng ký: {subscription}
                        </div>
                    </div>
                </div>
                <div className={cx("content_3", "col", "a-8", "a-o-2")}>
                    <ButtonAdmin
                        name={"Chỉnh sửa thông tin"}
                        onClick={handleUpdate}
                    />
                </div>
            </div>
        );
    }
}

export default UserInfo;
