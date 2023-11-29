import classNames from "classnames/bind";
import styles from "./custom.module.scss";

const cx = classNames.bind(styles);

const COLOR = [
    { bg: "#222", txt: "#ccc" },
    { bg: "#e5e3df", txt: "#333" },
    { bg: "#2E4600", txt: "#fff" },
    { bg: "#5D535E", txt: "#ccc" },
    { bg: "#2E2300", txt: "#ccc" },
    { bg: "#fff", txt: "black" },
    { bg: "#F7EFE2", txt: "#333" },
    { bg: "#662E1C", txt: "#ccc" },
];

const FONT = [
    "Nunito Sans",
    "Roboto",
    "Poppins",
    "Inter",
    "Mulish",
    "Work Sans",
];

function CustomReadChapter({
    clickColor,
    customPageContent,
    setCustomPageContent,
}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("item")}>
                Tùy chỉnh màu
                <div className={cx("item__content")}>
                    {COLOR.map((item, index) => (
                        <div
                            className={cx("item__color")}
                            key={index}
                            style={{
                                color: item.txt,
                                backgroundColor: item.bg,
                            }}
                            onClick={() => clickColor(item)}
                        />
                    ))}
                </div>
            </div>
            <div className={cx("item")}>
                <select
                    value={customPageContent.font}
                    onChange={(e) =>
                        setCustomPageContent({
                            ...customPageContent,
                            font: e.target.value,
                        })
                    }
                >
                    {FONT.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cx("item")}>
                <div className={cx("item__txt_size")}>
                    Cỡ chữ{" "}
                    <span
                        className={cx("btn")}
                        onClick={() => {
                            setCustomPageContent({
                                ...customPageContent,
                                txtSize: customPageContent.txtSize - 1,
                            });
                        }}
                    >
                        -
                    </span>
                    {customPageContent.txtSize}px
                    <span
                        className={cx("btn")}
                        onClick={() => {
                            setCustomPageContent({
                                ...customPageContent,
                                txtSize: customPageContent.txtSize + 1,
                            });
                        }}
                    >
                        +
                    </span>
                </div>
            </div>
            <div className={cx("item")}>
                <div className={cx("item__txt_size")}>
                    Giãn dòng
                    <span
                        className={cx("btn")}
                        onClick={() => {
                            setCustomPageContent({
                                ...customPageContent,
                                lineHeight:
                                    (customPageContent.lineHeight * 10 - 1) /
                                    10,
                            });
                        }}
                    >
                        -
                    </span>
                    {customPageContent.lineHeight}
                    <span
                        className={cx("btn")}
                        onClick={() => {
                            setCustomPageContent({
                                ...customPageContent,
                                lineHeight:
                                    (customPageContent.lineHeight * 10 + 1) /
                                    10,
                            });
                        }}
                    >
                        +
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CustomReadChapter;
