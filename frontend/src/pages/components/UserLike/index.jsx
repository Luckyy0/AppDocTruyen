import styles from "./UserLike.module.scss";
import classNames from "classnames/bind";
import UserLikeItem from "./UserLikeItem";
import privateApi from "../../../api/PrivateApi";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function UserLike() {
    const [history, setHistory] = useState([]);
    const [reset,setReset] = useState(false)
    const handleDeleteLike = async(comicId)=>{
        try {
            await privateApi.post("/like/"+comicId)
            setReset(!reset)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await privateApi.get("/like", {
                    params: {
                        pageNumber: 0,
                        pageSize: 10,
                    },
                });
                setHistory(apiResponse.data.content);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [reset]);
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>Truyện yêu thích</p>
            </div>
            <div className="row">
                {history.map((it, index) => (
                    <div key={index} className="col a-10 a-o-1">
                        <UserLikeItem item={it} onClick={handleDeleteLike}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserLike;
