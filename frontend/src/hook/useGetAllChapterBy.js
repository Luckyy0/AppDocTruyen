import { useEffect, useState } from "react";
import publicApi from "../api/PublicApi";

const useGetAllChapterById = (id) => {
    const [chapters, setChapters] = useState([]);
    const [isLoadingChapters, setIsLoadingChapters] = useState(true);
    const [errorChapters, setErrorChapters] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await publicApi.get("/chapter/all/"+id);
                setChapters(response.data);
                setIsLoadingChapters(false);
            } catch (error) {
                setErrorChapters(
                    error.response?.data?.message || "Có lỗi xảy ra"
                );
                setIsLoadingChapters(false);
            }
        };
        fetchData();
    }, [id]);

    return { chapters, isLoadingChapters, errorChapters };
};

export default useGetAllChapterById;
