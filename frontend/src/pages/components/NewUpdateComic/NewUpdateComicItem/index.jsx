import classNames from "classnames/bind";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { handleAddView } from "../../../../utils/CommonFunction";
import styles from "./NewUpdateComicItem.module.scss";
import { VipTag } from "../../../../components";

const cx = classNames.bind(styles);

function NewUpdateComicItem({ item }) {
    console.log(item);
    const handleTime = useMemo(() => {
        if (item.minute > 60 * 24) {
            return Math.floor(item.minute / (60 * 24)) + " ngày trước";
        } else if (item.minute > 60) {
            return Math.floor(item.minute / 60) + " giờ trước";
        } else {
            return item.minute + " phút trước";
        }
    }, [item.minute]);
    return (
        <Link
            className={cx("wrapper", "row")}
            to={"/book/" + item.comicId + "/chap/" + item.chapId}
            onClick={() => {
                handleAddView(item.comicId, item.chapId, item);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }}
        >
            <p className={cx("content-gen", "a-2")}>{item.genres[0].name}</p>
            <p className={cx("content-comic", "a-3")}>{item.comicName}</p>
            <div className={cx("content-name", "a-3")}>
                
                Chương {item.chapNumber}: {item.title}
            </div>
            <div className={cx("content-gen", "a-2")}>{item.author} {item.comicType === "PAID" ? <VipTag /> : <></>}</div>
            <p className={cx("content-time", "a-2")}>{handleTime} </p>
        </Link>
    );
}

export default NewUpdateComicItem;
