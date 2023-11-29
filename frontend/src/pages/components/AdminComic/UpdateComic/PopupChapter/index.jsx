import styles from "./PopupChapter.module.scss";
import classNames from "classnames/bind";
import privateApi from "../../../../../api/PrivateApi";
import publicApi from "../../../../../api/PublicApi";
import { useState, useEffect } from "react";
import {
    ButtonAdmin,
    TextAreaWithLabel,
    InputWithLabel,
    Label,
} from "../../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function PopupChapter({ isShow, onshow, item }) {

    const [chapters, setChapters] = useState([]);

    // Add chapter
    const [addChapterShow, setAddChapterShow] = useState(false);
    const [dataAddChapter, setDataAddChapter] = useState({
        chapNumber: 1,
        title: "",
        content: "",
        comicId: item.id,
    });

    // update chapter
    const [dataUpdateChapter, setDataUpdateChapter] = useState({
        chapId: "",
        chapNumber: "",
        title: "",
        content: "",
        comicId: item.id,
    });

    const handleUpdateChapter = async () =>{
        if(dataUpdateChapter.chapId){
            try {
                const apiResponse = await privateApi.put("/chapter/"+dataUpdateChapter.chapId, {
                    chapNumber: parseFloat(dataUpdateChapter.chapNumber),
                    title: dataUpdateChapter.title,
                    content: dataUpdateChapter.content,
                    comicId: parseInt(dataUpdateChapter.comicId)
                });
                console.log(apiResponse);
                alert("Cập nhật thành công");
                fetchChapters();
            } catch (error) {
                if (!error?.response) {
                    alert("Server not Response");
                } else {
                    console.log(error.response.data);
                }
            }
        }
        else{
            alert("Vui lòng chọn chapter trước khi thực hiện update")
        }
        
    }

    const handleGetChapter = async (comicId, chapterId) =>{
        try {
            const apiResponse = await privateApi.get("/"+comicId+"/chapter/"+chapterId)
            const chap = apiResponse.data
            setDataUpdateChapter({
                chapId: chap.chapId,
                chapNumber: chap.chapNumber,
                title: chap.title,
                content: chap.content,
                comicId: chap.comicId,
            });
            console.log(apiResponse.data);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    }

    const handleAddChapter = async () => {
        try {
            const apiResponse = await privateApi.post("/chapter", {
                ...dataAddChapter,
                chapNumber: parseFloat(dataAddChapter.chapNumber),
            });
            setDataAddChapter({
                chapNumber: 1,
                title: "",
                content: "",
                comicId: item.id,
            });
            console.log(apiResponse);
            alert("Thêm thành công");
            fetchChapters();
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };

    const fetchChapters = async () => {
        try {
            const response = await publicApi.get("/chapter/all/" + item.id);
            setChapters(response.data);
            // console.log(response);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await publicApi.get("/chapter/all/" + item.id);
                setChapters(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error.response?.data?.message || "Có lỗi xảy ra");
            }
        };
        fetchChapters();
    }, [item.id]);
    return (
        <div className={cx("popup-chapter", { show: isShow })} onClick={onshow}>
            <div
                className={cx("wrapper", "row", "a-11")}
                onClick={(e) => e.stopPropagation()}
            >
                <p className={cx("label", "col", "a-12")}>
                    {" "}
                    Quản lý chương truyện{" "}
                </p>
                {/* content 1 */}
                <div className={cx("content_1", "row", "a-5")}>
                    {/* comic info */}
                    <div className={cx("item__comic", "row", "a-12")}>
                        {/* Hình ảnh */}
                        <div className={cx("item__comic__image", "col", "a-5")}>
                            <img
                                className={cx(
                                    "item__img",
                                    "col",
                                    "a-8",
                                    "a-o-2"
                                )}
                                src={item.image}
                                alt="img"
                            />
                        </div>
                        <div className={cx("item__comic__info", "a-5")}>
                            {/* Tên */}
                            <div className={cx("item__name")}>{item.name}</div>
                            {/* Tác giả */}
                            <div className={cx("item__author")}>
                                Tác giả: {item.author.name}
                            </div>
                            {/* Thể loại */}
                            <div className={cx("item__genre")}>
                                Thể loại:{" "}
                                {item.genres.map((idx) => idx.name).toString()}
                            </div>
                            {/* Loại truyện */}
                            <div className={cx("item__genre")}>
                                Loại truyện: {item.type}
                            </div>
                        </div>
                    </div>
                    {/* Danh sách chương */}
                    <div className={cx("item__list__chapter", "row", "a-12")}>
                        <Label
                            name="Danh sách chương"
                            icon={<FontAwesomeIcon icon={faListUl} />}
                        />
                        <div className={cx("chapter__label", "row", "a-11")}>
                            <p className={cx("label__chapter", "col", "a-2")}>
                                Chapter
                            </p>
                            <p className={cx("label__chapter", "col", "a-4")}>
                                Tên chương
                            </p>
                            <p className={cx("label__chapter", "col", "a-3")}>
                                Ngày tạo
                            </p>
                            <p className={cx("label__chapter", "col", "a-3")}>
                                Ngày cập nhật
                            </p>
                        </div>
                        <div className={cx("chapter__menu", "col", "a-11")}>
                            {chapters.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx(
                                        "chapter__menu-item",
                                        "row",
                                        "a-12"
                                    )}
                                    onClick={()=>handleGetChapter(item.comicId, item.chapId)}
                                >
                                    <p
                                        className={cx(
                                            "chapter_name",
                                            "col",
                                            "a-2"
                                        )}
                                    >
                                        {item.chapNumber}
                                    </p>
                                    <p
                                        className={cx(
                                            "chapter_name",
                                            "col",
                                            "a-4"
                                        )}
                                    >
                                        {item.title}
                                    </p>
                                    <p
                                        className={cx(
                                            "chapter_name",
                                            "col",
                                            "a-3"
                                        )}
                                    >
                                        {item.createAt.split("T")[0]}
                                    </p>
                                    <p
                                        className={cx(
                                            "chapter_name",
                                            "col",
                                            "a-3"
                                        )}
                                    >
                                        {item?.updateAt?.split("T")[0] ||
                                            "Chưa có"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx("content_2", "col", "a-7")}>
                    <div className="col a-10">
                        <div className={cx("label", "col", "a-12")}>
                            Cập nhật chương 
                            {dataUpdateChapter.chapId? <div>có id là {dataUpdateChapter.chapId} và có tên là  {dataUpdateChapter.title} </div> :<></>}
                        </div>
                        <div className={cx("a-12", "item")}>
                            <InputWithLabel
                                label={"Chương số"}
                                value={dataUpdateChapter.chapNumber}
                                onChange={(e) => {
                                    setDataUpdateChapter({
                                        ...dataUpdateChapter,
                                        chapNumber: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={cx("a-12", "item")}>
                            <InputWithLabel
                                label={"Tiêu đề"}
                                value={dataUpdateChapter.title}
                                onChange={(e) => {
                                    setDataUpdateChapter({
                                        ...dataUpdateChapter,
                                        title: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={cx("a-12", "item")}>
                            <TextAreaWithLabel
                                label={"Nội dung chương"}
                                value={dataUpdateChapter.content}
                                onChange={(e) => {
                                    setDataUpdateChapter({
                                        ...dataUpdateChapter,
                                        content: e.target.value,
                                    });
                                }}
                            />
                        </div>

                        {/* button */}
                        <div className={cx("row", "a-10", "a-o-2", "button")}>
                            <div className={cx("col", "a-3", "a-o-1")}>
                                <ButtonAdmin
                                    name={"Quay lại"}
                                    onClick={onshow}
                                />
                            </div>
                            <div className={cx("col", "a-3", "a-o-1")}>
                                <ButtonAdmin
                                    name={"Chỉnh sửa"}
                                    onClick={handleUpdateChapter}
                                />
                            </div>
                            <div className={cx("col", "a-3", "a-o-1")}>
                                <ButtonAdmin
                                    name={"Thêm mới"}
                                    onClick={() => setAddChapterShow(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup add */}
            {addChapterShow && (
                <div
                    className={cx("add", { show: addChapterShow })}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div
                        className={cx("add_wrapper", "row", "a-8", "a-o-2")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cx("add_label", "col", "a-12")}>
                            Thêm chương mới
                        </div>
                        <div
                            className={cx(
                                "add_content",
                                "col",
                                "a-10",
                                "a-o-1"
                            )}
                        >
                            <div className="a-12">
                                <InputWithLabel
                                    label={"Chương số"}
                                    value={dataAddChapter.chapNumber}
                                    onChange={(e) => {
                                        setDataAddChapter({
                                            ...dataAddChapter,
                                            chapNumber: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="a-12">
                                <InputWithLabel
                                    label={"Tiêu đề"}
                                    value={dataAddChapter.title}
                                    onChange={(e) => {
                                        setDataAddChapter({
                                            ...dataAddChapter,
                                            title: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="a-12">
                                <TextAreaWithLabel
                                    label={"Nội dung chương"}
                                    value={dataAddChapter.content}
                                    onChange={(e) => {
                                        setDataAddChapter({
                                            ...dataAddChapter,
                                            content: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* button */}
                        <div
                            className={cx("row", "a-10", "a-o-1", "add_button")}
                        >
                            <div className={cx("col", "a-5", "a-o-1")}>
                                <ButtonAdmin
                                    name={"Quay lại"}
                                    onClick={() => setAddChapterShow(false)}
                                />
                            </div>
                            <div className={cx("col", "a-5", "a-o-1")}>
                                <ButtonAdmin
                                    name={"Thêm mới"}
                                    onClick={handleAddChapter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopupChapter;
