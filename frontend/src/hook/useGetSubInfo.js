import { useEffect, useState } from "react";
import privateApi from "../api/PrivateApi";

const useGetSubInfo = (id) => {
    const [subInfo, setSubInfo] = useState({});
    const [isLoadingSubInfo, setIsLoadingSubInfo] = useState(true);
    const [errorSubInfo, setErrorSubInfo] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await privateApi.get("/payment_info/"+id);
                setSubInfo(response.data);
                setIsLoadingSubInfo(false);
            } catch (error) {
                setErrorSubInfo(
                    error.response?.data?.message || "Có lỗi xảy ra"
                );
                setIsLoadingSubInfo(false);
            }
        };
        fetchData();
    }, [id]);

    return { subInfo, isLoadingSubInfo, errorSubInfo };
};

export default useGetSubInfo;
