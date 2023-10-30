import { NominatedComicItem } from "../../components";
import styles from "./search.module.scss";
import classNames from "classnames/bind";
import { actions, useStore } from "../../../context/store";
import { memo } from "react";
const cx = classNames.bind(styles);

const orderBy = [
    "Lượt đọc",
    "Mới cập nhật",
    "Lượt thích",
    "Lượt Theo dõi",
    "Ngẫu nhiên",
];

function Search() {
    const [searchOrder, dispatch] = useStore();
    const { userSearchOrder } = searchOrder;
    console.log(userSearchOrder);
    return (
        <div className={cx("wrapper", "col", "a-12")}>
            <div className={cx("content_1")}>
                {orderBy.map((item, index) => (
                    <div
                        key={index}
                        className={cx("item", {
                            isActive: index === userSearchOrder,
                        })}
                        onClick={() => {
                            dispatch(actions.setUserSearchOrder(index));
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className={cx("content_2", "row")}>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>

                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
                <div className="col a-6">
                    <NominatedComicItem />
                </div>
            </div>
        </div>
    );
}

export default memo(Search);
