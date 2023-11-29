import styles from "./VipTag.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCertificate
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function VipTag() {
    return (
        <div className={cx("index")}>
            <FontAwesomeIcon icon={faCertificate} />
            <div className={cx('txt')}>vip</div>
        </div>
    );
}

export default VipTag;
