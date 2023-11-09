import { useState } from "react";
import {
    ButtonAdmin,
    RadioWithLabel,
    TextAreaWithLabel,
    Popup,
} from "../../../../components";
import InputWithLabel from "../../../../components/InputWithLabel";
import styles from "./AddComic.module.scss";
import classNames from "classnames/bind";
import privateApi from "../../../../api/PrivateApi";
import publicApi from "../../../../api/PublicApi";

const cx = classNames.bind(styles);

const Type = ["FREE", "PAID"];

function AdminAddComic() {
    const [data1, setData1] = useState({
        image: "",
        name: "",
        description: "",
        author_id: undefined,
        genres: [],
        type: Type[0],
    });
    // author
    const [popup, SetPopup] = useState(false);
    const [popupSelectAuthor, setPopupSelectAuthor] = useState(false);
    const [searchAuthor, setSearchAuthor] = useState("");
    const [authors, setAuthors] = useState([]);
    const [authorName, setAuthorName] = useState("");

    //genre
    const [popupGenre, SetPopupGenre] = useState(false);
    const [searchGenre, setSearchGenre] = useState("");
    const [popupSelectGenre, setPopupSelectGenre] = useState(false);
    const [genres, setGenres] = useState([]);
    const [allGenres, setAllGenres] = useState([]);

    //genre action
    const handleAddGenre = async (data, setData) => {
        try {
            const apiResponse = await privateApi.post("/genre", {
                name: data[0]?.value,
            });
            setData([{ name: "Tên thể loại ", value: "" }]);
            SetPopupGenre(false);
            const dataCopy = { ...data1 };
            dataCopy.genres.push(apiResponse.data.id);
            setData1(dataCopy);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };
    const handleSearchgenres = async () => {
        try {
            const response = await publicApi.get("/genre", {
                params: { search: searchGenre },
            });
            setGenres(response.data);
            const response2 = await publicApi.get("/genre");
            setAllGenres(response2.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    // author action
    const handleAddAuthor = async (data, setData) => {
        try {
            const apiResponse = await privateApi.post("/author", {
                name: data[0]?.value,
                description: data[1]?.value,
            });
            setData([
                { name: "Tên tác giả", value: "" },
                { name: "Thông tin mô tả", value: "" },
            ]);
            SetPopup(false);
            setData1({
                ...data1,
                author_id: apiResponse.data.id,
            });
            setAuthorName(apiResponse.data.name);
        } catch (error) {
            if (!error?.response) {
                alert("Server not Response");
            } else {
                console.log(error.response.data);
            }
        }
    };
    const handleSearchAuthors = async () => {
        try {
            const response = await publicApi.get("/author", {
                params: { search: searchAuthor },
            });
            setAuthors(response.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    console.log(data1);
    // add comic action
    const handleAddComic = async () => {
        try {
            const responseApi = await privateApi.post("/comic", data1);
            console.log(responseApi);
            alert("Thêm truyện thành công")
        } catch (error) {
            console.log(error.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    return (
        <div className={cx("wrapper", "row", "a-12")}>
            <p className={cx("label", "col", "a-12")}>Thêm truyện</p>
            {/* Hình ảnh */}
            <div className={cx("col", "a-10")}>
                <InputWithLabel
                    label={"Hình ảnh"}
                    value={data1.image}
                    onChange={(e) =>
                        setData1({ ...data1, image: e.target.value })
                    }
                />
            </div>
            {/* Tên truyện */}
            <div className={cx("col", "a-10")}>
                <InputWithLabel
                    label={"Tên truyện"}
                    value={data1.name}
                    onChange={(e) =>
                        setData1({ ...data1, name: e.target.value })
                    }
                />
            </div>

            {/* Mô tả */}
            <div className={cx("col", "a-10")}>
                <TextAreaWithLabel
                    label={"Mô tả"}
                    value={data1.description}
                    onChange={(e) =>
                        setData1({ ...data1, description: e.target.value })
                    }
                />
            </div>

            {/* Tác giả */}
            <div className={cx("author", "row", "a-10")}>
                <p className={cx("author__label", "col", "a-2")}>Tác giả </p>
                <div className={cx("author__name", "col", "a-2")}>
                    {authorName}
                </div>
                <div className={cx("author__search", "row", "a-8")}>
                    <p className={cx("author__search-label", "a-2")}>
                        Tìm kiếm
                    </p>
                    <input
                        className={cx("author__search-input", "a-4")}
                        type="text"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                        spellCheck={false}
                        required={true}
                    />
                    <div className={cx("author__search-btn", "a-2")}>
                        <ButtonAdmin
                            name={"chọn"}
                            onClick={() => {
                                setPopupSelectAuthor(true);
                                handleSearchAuthors();
                            }}
                        />
                    </div>
                    <div className={cx("author__search-btn", "a-3")}>
                        <ButtonAdmin
                            name={"Thêm mới"}
                            onClick={() => SetPopup(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Thể loại */}
            <div className={cx("genre", "row", "a-10")}>
                <p className={cx("genre__label", "col", "a-2")}>Thể loại </p>
                <div className={cx("genre__name", "col", "a-2")}>
                    {data1.genres.toString()}
                </div>
                <div className={cx("genre__search", "row", "a-8")}>
                    <p className={cx("genre__search-label", "a-2")}>Tìm kiếm</p>
                    <input
                        className={cx("genre__search-input", "a-4")}
                        type="text"
                        value={searchGenre}
                        onChange={(e) => setSearchGenre(e.target.value)}
                        spellCheck={false}
                        required={true}
                    />
                    <div className={cx("genre__search-btn", "a-2")}>
                        <ButtonAdmin
                            name={"chọn"}
                            onClick={() => {
                                setPopupSelectGenre(true);
                                handleSearchgenres();
                            }}
                        />
                    </div>
                    <div className={cx("genre__search-btn", "a-3")}>
                        <ButtonAdmin
                            name={"Thêm mới"}
                            onClick={() => SetPopupGenre(true)}
                        />
                    </div>
                </div>
            </div>

            {/*Loại truyện  */}
            <div className={cx("row", "a-10")}>
                <RadioWithLabel
                    label={"Loại truyện"}
                    data={Type}
                    indexValue={Type.indexOf(data1.type)}
                    onGetData={(index) => {
                        setData1({
                            ...data1,
                            type: Type[index],
                        });
                    }}
                />
            </div>

            {/* button add */}
            <div className={cx("col", "a-10", "a-o-2", "button")}>
                <ButtonAdmin name={"Thêm truyện"} onClick={handleAddComic} />
            </div>

            {/* popup select author */}
            {popupSelectAuthor && (
                <div
                    className={cx("popup", { show: popupSelectAuthor })}
                    onClick={() => setPopupSelectAuthor(false)}
                >
                    <div
                        className={cx("wrapper", "a-8", "a-o-2")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cx("popup__label")}>
                            Lựa chọn tác giả
                        </div>

                        <div className={cx("popup__content")}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên tác giả</th>
                                        <th>Mô tả</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authors.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td
                                                className={cx("select")}
                                                onClick={() => {
                                                    setData1({
                                                        ...data1,
                                                        author_id: item.id,
                                                    });
                                                    setAuthorName(item.name);
                                                    setPopupSelectAuthor(false);
                                                }}
                                            >
                                                Chọn
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx("popup__btn")}>
                            <ButtonAdmin
                                name={"Quay lại"}
                                onClick={() => setPopupSelectAuthor(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Popup add author*/}
            <Popup
                isShow={popup}
                onshow={() => SetPopup(false)}
                label={"Thêm tác giả"}
                actionName={"Xác nhận"}
                dataArr={[
                    { name: "Tên tác giả", value: "" },
                    { name: "Thông tin mô tả", value: "" },
                ]}
                onAction={(data, setData) => handleAddAuthor(data, setData)}
            />

            {/* popup select genre */}
            {popupSelectGenre && (
                <div
                    className={cx("popup", { show: popupSelectGenre })}
                    onClick={() => setPopupSelectGenre(false)}
                >
                    <div
                        className={cx("wrapper", "a-8", "a-o-2")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cx("popup__label")}>
                            Lựa chọn thể loại
                        </div>

                        <div className={cx("popup__content")}>
                            <div className={cx("popup__content-1")}>
                                <div className={cx("popup__label")}>
                                    Thể loại đã chọn
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên Thể loại</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allGenres
                                            .filter(
                                                (item) =>
                                                    data1.genres.includes(
                                                        item.id
                                                    ) === true
                                            )
                                            .map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td
                                                        className={cx("select")}
                                                        onClick={() => {
                                                            const dataCopy = {
                                                                ...data1,
                                                            };
                                                            dataCopy.genres =
                                                                dataCopy.genres.filter(
                                                                    (itemId) =>
                                                                        itemId !==
                                                                        item.id
                                                                );
                                                            setData1(dataCopy);
                                                        }}
                                                    >
                                                        Xóa
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx("popup__content-2")}>
                                <div className={cx("popup__label")}>
                                    Danh sách thể loại
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên Thể loại</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {genres
                                            .filter(
                                                (item) =>
                                                    data1.genres.includes(
                                                        item.id
                                                    ) === false
                                            )
                                            .map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td
                                                        className={cx("select")}
                                                        onClick={() => {
                                                            const dataCopy = {
                                                                ...data1,
                                                            };
                                                            dataCopy.genres.push(
                                                                item.id
                                                            );
                                                            setData1(dataCopy);
                                                        }}
                                                    >
                                                        Chọn
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={cx("popup__btn")}>
                            <ButtonAdmin
                                name={"Quay lại"}
                                onClick={() => setPopupSelectGenre(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Popup add genre*/}
            <Popup
                isShow={popupGenre}
                onshow={() => SetPopupGenre(false)}
                label={"Thêm thể loại"}
                actionName={"Xác nhận"}
                onAction={(data, setData) => handleAddGenre(data, setData)}
                dataArr={[{ name: "Tên thể loại ", value: "" }]}
            />
        </div>
    );
}

export default AdminAddComic;
