import { useState } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function RadioWithLabel({ label, onGetData, data,indexValue, color = 'aquamarine'}) {
    const [checked, setChecked] = useState(indexValue);
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <p className={cx("label", "col", "a-2")} style={{color:color}}> {label}</p>
            <div className={cx("in", "row", "a-9","a-o-1")}>
                {data.map((item, index) => (
                    <div key={index} className={cx("item")}>
                        <input
                            type="radio"
                            checked={checked === index}
                            onChange={() => {
                                setChecked(index);
                                onGetData(index);
                            }}
                        />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RadioWithLabel;
