import { useEffect, useState } from "react";
import publicApi from "../api/PublicApi";

const useGetListSubscription = () => {
    const [subs, setSubs] = useState([]);
    const [isLoadingSubs, setIsLoadingSubs] = useState(true);
    const [errorSubs, setErrorSubs] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await publicApi.get("/subscription");
                setSubs(response.data);
                setIsLoadingSubs(false);
            } catch (error) {
                setErrorSubs(
                    error.response?.data?.message || "Có lỗi xảy ra"
                );
                setIsLoadingSubs(false);
            }
        };
        fetchData();
    }, []);

    return { subs, isLoadingSubs, errorSubs };
};

export default useGetListSubscription;
