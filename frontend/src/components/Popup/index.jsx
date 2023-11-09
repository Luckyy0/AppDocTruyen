import {  useState } from "react";
import ButtonAdmin from "../Button";
import styles from "./Popup.module.scss";
import classNames from "classnames/bind";
import InputWithLabel from "../InputWithLabel";

const cx = classNames.bind(styles);

function Popup({ isShow, onshow, label, actionName, dataArr, onAction }) {
    const [data, SetData] = useState(dataArr);
    return (
        <div
            className={cx("cover", "row", "a-12", { show: isShow })}
            onClick={onshow}
        >
            <div
                className={cx("cover-content", "row", "a-6", "a-o-3")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={cx("cover-label", "col", "a-12")}>{label}</div>
                <div className={cx("cover-content", "col", "a-10", "a-o-1")}>
                    {data.map((item, index) => {
                        return (
                            <InputWithLabel
                                key={index}
                                label={item.name}
                                value={item.value}
                                onChange={(e) => {
                                    // SetData(data.map((obj, indx) => {if (indx === index) {return {...obj,value: e.target.value,};} else {return obj;}}));
                                    const newState = [...data];
                                    newState[index].value = e.target.value;
                                    SetData(newState);
                                }}
                            />
                        );
                    })}
                </div>
                <div className={cx("cover-button", "row", "a-10", "a-o-1")}>
                    <div className={cx("col", "a-4", "a-o-1")}>
                        <ButtonAdmin name={"Quay lại"} onClick={onshow} />
                    </div>
                    <div className={cx("col", "a-4", "a-o-3")}>
                        <ButtonAdmin
                            
                            name={actionName}
                            onClick={() => {
                                onAction(data, SetData);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
