import styles from "./UserHistory.module.scss";
import classNames from "classnames/bind";
import UserHistoryItem from "./UserHistoryItem";
import { useEffect, useState } from "react";
import privateApi from "../../../api/PrivateApi";

const cx = classNames.bind(styles);

function UserHistory() {
    const [history, setHistory] = useState([]);
    const [reset,setReset] = useState(false)

    const handleDeleteView = async(comicId)=>{
        try {
            await privateApi.delete("/view/"+comicId)
            setReset(!reset)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await privateApi.get("/history",{
                    params:{
                        pageNumber: 0,
                        pageSize:10
                    }
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
                <p className={cx("label", "col", "a-3")}>Lịch sử đọc</p>
            </div>
            <div className="row">
                {history.map((it) => (
                    <div key={it.chapId} className="col a-10 a-o-1">
                        <UserHistoryItem item={it} onClick={handleDeleteView}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserHistory;
