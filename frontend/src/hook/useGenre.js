import publicApi from "../api/PublicApi";
import { useState, useEffect } from "react";

const useGenres = () => {
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await publicApi.get("/genre");
                setGenres(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.response?.data?.message||"Có lỗi xảy ra");
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, []);

    return { genres, isLoading, error };
};

export default useGenres;