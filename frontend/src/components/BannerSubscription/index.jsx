import { useState, useEffect, useRef } from "react";
import styles from "./banner.module.scss";
import classNames from "classnames/bind";
import useGetListSubscription from "../../hook/useGetListSubscription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import privateApi from "../../api/PrivateApi";
import Toast from "../Toast";
import { TOAST } from "../../utils/constants";
import label from "../label";

const cx = classNames.bind(styles);

function BannerSubscription() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { subs } = useGetListSubscription();
    const [toastInfo, setToastInfo] = useState({
        isShow: false,
        label: TOAST.ERROR,
        content: "",
    });

    const backgroundImagePath = `${process.env.PUBLIC_URL}/bgbanner.jpg`;
    const showBanner = (index) => {
        setCurrentIndex(index);
    };

    const handleSubscription = async (id) => {
        setToastInfo({
            ...toastInfo,
            isShow: false,
            content: "",
            label: TOAST.INFO,
        });
        try {
            const apiResponse = await privateApi.get("/checkuser");
            if (apiResponse.data.status) {
                setToastInfo({
                    ...toastInfo,
                    isShow: true,
                    content: "Đang sử dụng gói thành viên",
                    label: TOAST.INFO,
                });
            } else {
                const res = await privateApi.post("/payment/createPayment", {
                    bankCode: "NCB",
                    subscriptionId: id,
                });
                window.open(res.data.data, "_blank");
            }
        } catch (error) {
            setToastInfo({
                ...toastInfo,
                isShow: true,
                content: "Vui lòng đăng nhập",
                label: TOAST.ERROR,
            });
        }
    };

    useEffect(() => {
        let intervalId;

        if (!isHovered) {
            intervalId = setInterval(
                () =>
                    setCurrentIndex(
                        (prevIndex) => (prevIndex + 1) % subs.length
                    ),
                3000
            );
        }

        return () => clearInterval(intervalId);
    }, [isHovered, subs]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const goToPrevBanner = () => {
        const newIndex = (currentIndex - 1 + subs.length) % subs.length;
        showBanner(newIndex);
    };

    const goToNextBanner = () => {
        const newIndex = (currentIndex + 1) % subs.length;
        showBanner(newIndex);
    };

    return (
        <div
            className={cx("banner-container")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundImage: `url(${backgroundImagePath})`,
            }}
        >
            {toastInfo.isShow && (
                <Toast label={toastInfo.label} content={toastInfo.content} />
            )}
            <div
                className={cx("banner-item")}
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
                {subs.map((item, index) => (
                    <div
                        key={index}
                        className={cx("banner-content", {
                            notActive: index !== currentIndex,
                        })}
                    >
                        <div className={cx("item")}>
                            <div className={cx("item__name")}>
                                Gói đăng ký {item.duration} tháng
                            </div>
                            <div className={cx("item__price")}>
                                {Math.floor(item.price / item.duration)}.000
                                vnđ/tháng
                            </div>
                            <div className={cx("item__content")}>
                                <div className={cx("item__label")}>
                                    {" "}
                                    Lợi ích{" "}
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        className={cx("item__tick")}
                                        icon={faCheck}
                                    />{" "}
                                    Đem lại nhiều đặc quyền hơn
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        className={cx("item__tick")}
                                        icon={faCheck}
                                    />{" "}
                                    Truy cập được tất cả các truyện trả phí
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        className={cx("item__tick")}
                                        icon={faCheck}
                                    />{" "}
                                    Đa dạng các Theme colors{" "}
                                </div>
                            </div>
                            <div className={cx("item__price")}>
                                Giá gói: {item.price}.000 vnđ
                            </div>

                            <button
                                className={cx("item__btn")}
                                onClick={() => handleSubscription(item.id)}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className={cx("control-button-pre")}
                onClick={goToPrevBanner}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
                className={cx("control-button-next")}
                onClick={goToNextBanner}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    );
}

export default BannerSubscription;
