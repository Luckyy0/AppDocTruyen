import styles from "./NewUpdateComicItem.module.scss";
import classNames from "classnames/bind";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NewUpdateComicItem({item}) {
    const handleTime = useMemo(()=>{
        if(item.minute>60*24){
            return Math.floor(item.minute/(60*24)) + ' ngày trước'
        }
        else if(item.minute>60) {
            return Math.floor(item.minute/60) + ' giờ trước'
        }else{
            return item.minute + ' phút trước'
        }
    },[item.minute])
    return (
        <Link className={cx("wrapper", "row")} to={'/book'}>
            <p className={cx("content-gen", "a-2")}>{item.genre}</p>
            <p className={cx("content-comic", "a-3")}>{item.comicName}</p>
            <p className={cx("content-name", "a-3")}>Chương {item.chapNumber}: {item.title}</p>
            <p className={cx("content-gen", "a-2")}>{item.author}</p>
            <p className={cx("content-time", "a-2")}>{handleTime} </p>
        </Link>
    );
}

export default NewUpdateComicItem;
