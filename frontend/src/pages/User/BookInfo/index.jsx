import { useParams } from "react-router-dom";
import { ComicInfo, Comment } from "../../components";
import styles from "./bookInfo.module.scss";
import classNames from "classnames/bind";
import privateApi from "../../../api/PrivateApi";
import publicApi from "../../../api/PublicApi";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function BookInfo() {
    const { id } = useParams();
    const [isLoadingComic,setIsLoadingComic] = useState(true)
    const [comic, setComic] = useState({});
    const [isLike,setIsLike]= useState(false)
    const [isFollow,setIsFollow]= useState(false)

    const fetchComic =  async () => {
        try {
            const response = await publicApi.get("/comic/"+id);
            console.log(response.data)
            setIsLoadingComic(false)
            setComic(response.data)
        } catch (error) {
            setIsLoadingComic(false)
            console.log(error) 
        }
    };
    useEffect(()=>{
        fetchComic()
    },[])

    const fetchCheckLike = async()=>{
        try {
            const apiResponse =await privateApi.get("/like/"+id)
            setIsLike(apiResponse.data.status)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchCheckLike()
    },[])
    
    const handleLike = async()=>{
        try {
            const apiResponse = await privateApi.post("/like/"+id)
            console.log(apiResponse.data.message)
            fetchCheckLike()
            // setIsLoadingComic(true)
            fetchComic()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCheckFollow = async()=>{
        try {
            const apiResponse =await privateApi.get("/follow/"+id)
            // setIsLoadingComic(true)
            setIsFollow(apiResponse.data.status)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchCheckFollow()
    },[])
    const handleFollow = async()=>{
        try {
            const apiResponse = await privateApi.post("/follow/"+id)
            fetchCheckFollow()
            fetchComic()
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoadingComic) {
        return <div>Loading . . .</div>;
    } else {
        // if(comic.type==='PAID')
        return (
            <div className={cx("wrapper")}>
                <ComicInfo item={comic} handleLike={handleLike} isLike={isLike} handleFollow={handleFollow} isFollow={isFollow}/>
                <Comment id={id} path="/commentComic"/>
            </div>
        );
    }
}

export default BookInfo;
