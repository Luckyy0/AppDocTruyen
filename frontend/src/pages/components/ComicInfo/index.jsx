import {
    faBook,
    faCircleInfo,
    faCircleRight,
    faHeart,
    faListUl,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import privateApi from "../../../api/PrivateApi";
import { Genre, Tag } from "../../../components";
import Label from "../../../components/label";
import useGetAllChapterById from "../../../hook/useGetAllChapterBy";
import { handleAddView } from "../../../utils/CommonFunction";
import styles from "./ComicInfo.module.scss";
const cx = classNames.bind(styles);

function ComicInfo({ item, handleLike, isLike, handleFollow, isFollow }) {
    const { chapters } = useGetAllChapterById(item.id);
    const navigate = useNavigate();
    console.log(item);

    const handleReadContinue = async () => {
        try {
            const apiResponse = await privateApi.get("/view/" + item.id);
            navigate("/book/" + item.id + "/chap/" + apiResponse.data.chapId, {
                state: { type: item.type },
            });
            await handleAddView(
                item.id,
                apiResponse.data.chapId,
                apiResponse.data
            );
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            alert(error.response.data?.message || "Có lỗi xảy ra");
        }
    };

    const handleReadFirstChapter = async () => {
        navigate(
            "/book/" +
                item.id +
                "/chap/" +
                chapters[chapters.length - 1]?.chapId,
            { state: { type: item.type } }
        );
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth",
        });
        await handleAddView(
            item.id,
            chapters[chapters.length - 1]?.chapId,
            chapters[chapters.length - 1]
        );
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-1")}>
                <Link to={"/"}>Trang chủ</Link>
                <p>&nbsp; /&nbsp;</p>
                <Link to={"/book/" + item.id}>{item.name}</Link>
            </div>
            <div className={cx("content-2")}>
                <img className={cx("image")} src={item.image} alt="img" />
            </div>
            <div className={cx("content-3")}>
                <p>{item.name}</p>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Tác giả</p>
                    <p className={cx("e_2")}>{item.author.name}</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Tình trạng</p>
                    <p className={cx("e_2")}>
                        {item.status === "IN_PROGRESS"
                            ? "Đang cập nhật"
                            : "Đã hoàn thành"}
                    </p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Lượt thích</p>
                    <p className={cx("e_2")}>{item.like}</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Lượt theo dõi</p>
                    <p className={cx("e_2")}>{item.follow}</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Lượt xem</p>
                    <p className={cx("e_2")}>{item.view}</p>
                </div>
                <div className={cx("line")}>
                    <p className={cx("e_1")}>Loại truyện</p>
                    <p className={cx("e_2")}>{item.type}</p>
                </div>
            </div>
            <div className={cx("content-4")}>
                {item.genres.map((it) => (
                    <Genre key={it.id} name={it.name} />
                ))}
            </div>
            <div className={cx("content-5")}>
                <Tag
                    name="Đọc từ đầu"
                    icon={<FontAwesomeIcon icon={faBook} />}
                    isDisable={chapters.length === 0}
                    onClick={handleReadFirstChapter}
                />
                <Tag
                    name={isFollow ? "Đã theo dõi" : "Theo dõi"}
                    icon={<FontAwesomeIcon icon={faHeart} />}
                    onClick={handleFollow}
                />
                <Tag
                    name={isLike ? "Đã like" : "Like"}
                    icon={<FontAwesomeIcon icon={faThumbsUp} />}
                    onClick={handleLike}
                />
                <Tag
                    name="Đọc tiếp"
                    icon={<FontAwesomeIcon icon={faCircleRight} />}
                    onClick={handleReadContinue}
                />
            </div>
            <div className={cx("content-6")}>
                <Label
                    name="Thông tin mô tả"
                    icon={<FontAwesomeIcon icon={faCircleInfo} />}
                />
                <p className={cx("info")}>{item.description}</p>
            </div>

            <div className={cx("content-7")}>
                <Label
                    name="Danh sách chương"
                    icon={<FontAwesomeIcon icon={faListUl} />}
                />
                {/* Danh sách chương */}
                <div className={cx("list_chapter")}>
                    {chapters.map((it) => (
                        <div
                            key={it.chapId}
                            className={cx("list_chapter-item")}
                            to={"/book/" + item.id + "/chap/" + it.chapId}
                            onClick={() => {
                                handleAddView(item.id, it.chapId, it);
                                navigate(
                                    "/book/" + item.id + "/chap/" + it.chapId,
                                    {
                                        state: { type: item.type },
                                    }
                                );
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }}
                        >
                            <p className={cx("chapter_name")}>
                                Chương {it.chapNumber}: {it.title}
                            </p>
                            <p className={cx("chapter_date")}>
                                {it.createAt.split("T")[0]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComicInfo;
