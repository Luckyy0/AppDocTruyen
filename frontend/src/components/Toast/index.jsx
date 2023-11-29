import classNames from "classnames/bind";
import { TOAST } from "../../utils/constants";
import styles from "./toast.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleInfo,
    faTriangleExclamation,
    faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Toast({ label = TOAST.ERROR, content }) {
    return (
        <div className={cx("wrapper")} >
            <div
                className={cx("toast", {
                    "toast--success": label === TOAST.SUCCESS,
                    "toast--info": label === TOAST.INFO,
                    "toast--warrning": label === TOAST.WARRNING,
                    "toast--error": label === TOAST.ERROR,
                })}
            >
                <div className={cx("toast__icon")}>
                    {label === TOAST.SUCCESS? <FontAwesomeIcon icon={faCircleCheck} />:<></>}
                    {label === TOAST.INFO? <FontAwesomeIcon icon={faCircleInfo} />:<></>}
                    {label === TOAST.WARRNING? <FontAwesomeIcon icon={faCircleExclamation} />:<></>}
                    {label === TOAST.ERROR? <FontAwesomeIcon icon={faTriangleExclamation} />:<></>}
                </div>
                <div className={cx("toast__body")}>
                    <h3 className={cx("toast__title")}>{label}</h3>
                    <p className={cx("toast__msg")}>
                        {content}
                    </p>
                </div>
                {/* <div className={cx("toast__close")}>
                    <i className={cx("fa-solid", "fa-xmark")}></i>
                </div> */}
            </div>
        </div>
    );
}

export default Toast;
