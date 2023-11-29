import styles from "./UserMark.module.scss";
import classNames from "classnames/bind";
import UserMarkItem from "./UserMarkItem";
import privateApi from "../../../api/PrivateApi";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function UserMark() {
    const [history, setHistory] = useState([]);
    const [reset,setReset] = useState(false)

    const handleDeleteFollow = async(comicId)=>{
        try {
            await privateApi.post("/follow/"+comicId)
            setReset(!reset)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await privateApi.get("/follow", {
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
    console.log(history)
    return (
        <div className={cx("wrapper")}>
            <div>
                <p className={cx("label", "col", "a-3")}>
                    Truyện đang theo dõi
                </p>
            </div>
            <div className="row">
                {history.map((it, index) => (
                    <div key={index} className="col a-10 a-o-1">
                        <UserMarkItem item={it} onClick={handleDeleteFollow}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserMark;
