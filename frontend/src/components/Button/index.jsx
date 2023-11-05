import styles from "./ButtonAdmin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ButtonAdmin({ name, onClick }) {
    return (
        <div className={cx("wrapper")} onClick={onClick} >
            <p className={cx("name")}>{name}</p>
        </div>
    );
}

export default ButtonAdmin;
