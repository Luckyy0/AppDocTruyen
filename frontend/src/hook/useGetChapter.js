import { useEffect, useState } from "react";
import publicApi from "../api/PublicApi";
import useGetComic from "./useGetComic";
import privateApi from "../api/PrivateApi";

const useGetChapter = (comicId, chapterId) => {
    const { comic } = useGetComic(comicId);
    const [chapter, setChapter] = useState({});
    const [isLoadingChapter, setIsLoadingChapter] = useState(true);
    const [errorChapter, setErrorChapter] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            let response;
            try {
                if (comic.type === "PAID") {
                    response = await privateApi.get(
                        "/" + comicId + "/chapter/" + chapterId
                    );
                } else {
                    response = await publicApi.get(
                        "/" + comicId + "/chapter/" + chapterId
                    );
                }
                setErrorChapter("");
                setChapter(response.data);
                setIsLoadingChapter(false);
            } catch (error) {
                console.log(error);
                setErrorChapter("Vui lòng đăng nhập hoặc mua gói đăng ký");
                setIsLoadingChapter(false);
            }
        };
        fetchData();
    }, [chapterId, comicId, comic]);

    return { chapter, isLoadingChapter, errorChapter };
};

export default useGetChapter;
