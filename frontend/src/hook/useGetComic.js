import { useEffect, useState } from "react";
import publicApi from "../api/PublicApi";

const useGetComic = (id) => {
    const [comic, setComic] = useState({});
    const [isLoadingComic, setIsLoadingComic] = useState(true);
    const [errorComic, setErrorComic] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await publicApi.get("/comic/"+id);
                setComic(response.data);
                setIsLoadingComic(false);
            } catch (error) {
                setErrorComic(
                    error.response?.data?.message || "Có lỗi xảy ra"
                );
                setIsLoadingComic(false);
            }
        };
        fetchData();
    }, [id]);

    return { comic, isLoadingComic, errorComic };
};

export default useGetComic;
