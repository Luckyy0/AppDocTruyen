import { useState } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function InputWithLabel(
    { label, onChange, value, color = "aquamarine",bg = "azure" }
    
) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <p
                className={cx("label", "col", "a-2", "a-o-1")}
                style={{ color: color }}
            >
                {" "}
                {label}
            </p>
            <div className={cx("in", "col", "a-10")}>
                <input
                    type="text"
                    spellCheck={false}
                    value={value}
                    onChange={onChange}
                    required={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        borderColor: isFocused ? color : "black",
                        backgroundColor: bg,
                    }}
                />
            </div>
        </div>
    );
}

export default InputWithLabel;
