import { useParams } from "react-router-dom";
import styles from "./SubInfo.module.scss";
import classNames from "classnames/bind";
import useGetSubInfo from "../../../hook/useGetSubInfo";
import {formatDateString} from '../../../utils/CommonFunction'
const cx = classNames.bind(styles);

function SubscriptionInfo() {
    const { subscription_info_id } = useParams();
    const { subInfo, isLoadingSubInfo } = useGetSubInfo(subscription_info_id);
    
    if (isLoadingSubInfo) return <div>Loading . . .</div>;
    else {
        const info = subInfo?.info?.split(" ")
        const date = formatDateString(info[9]);
        return (
            
            <div className={cx("wrapper", "row", "a-12")}>
                <div className={cx("label",'col','a-12')}>Thông tin thanh toán</div>
                <div className={cx('content','col','a-12')}>
                    <div>Trạng thái thanh toán: {subInfo.status}</div>
                    <div>Mã giao dịch: {info[2]}</div>
                    <div>Ngân hành: NCB </div>
                    <div>Số tiền giao dịch: {info[12]/100} vnđ</div>
                    
                    <div>Tài khoản thực hiện giao dịch: {subInfo.user.email}</div> 
                    <div>Gói đăng ký: thời hạn {subInfo.subscription.duration} tháng</div>
                    <div>Thời gian thực hiện giao dịch: { date }</div>
                </div>
            </div>
        );
    }
}

export default SubscriptionInfo;
