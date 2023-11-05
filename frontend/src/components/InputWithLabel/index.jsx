import styles from "./Input.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function InputWithLabel({ label, onChange, value }) {
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <p className={cx("label", "col", "a-2","a-o-1")}> {label}</p>
            <div className={cx("in", "col", "a-10")}>
                <input type="text" spellCheck={false} />
            </div>
        </div>
    );
}

export default InputWithLabel;
