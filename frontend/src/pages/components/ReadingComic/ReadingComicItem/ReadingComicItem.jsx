import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { VipTag } from "../../../../components";
import {
    handleAddViewIntoDatabase
} from "../../../../utils/CommonFunction";
import styles from "./ReadingComicItem.module.scss";

const cx = classNames.bind(styles);

function ReadingComicItem({ item }) {
    const navigate = useNavigate();
    const handleClick = async () => {
        await handleAddViewIntoDatabase(item.comicId, item.chapId);
        navigate("/book/" + item.comicId + "/chap/" + item.chapId);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className={cx("wrapper", "row")}>
            <div className={cx("image")}>
                {item.comicType === "PAID" ? <VipTag /> : <></>}
                <img className={cx("image-main")} src={item.image} alt="img" />
            </div>
            <div className={cx("content")}>
                <p className={cx("content-name")}>
                    {item.comicName.length > 30
                        ? item.comicName.slice(0, 28) + " ..."
                        : item.comicName}
                </p>
                <div className={cx("line")}>
                    <p className={cx("content-dadoc")}>
                        Đang đọc: chương {item.chapNumber}
                    </p>
                    <p className={cx("content-genre")} onClick={handleClick}>
                        Đọc tiếp
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReadingComicItem;
