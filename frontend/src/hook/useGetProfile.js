import { useEffect,useState } from "react";
import usePrivateApi from "./usePrivateApi";

const useGetProfile = () => {
    const [profile, setProfile] = useState([]);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState(null);
    const api = usePrivateApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/profile");
                setProfile(response.data);
                setIsLoadingProfile(false);
            } catch (error) {
                setErrorProfile(
                    error.response?.data?.message || "Có lỗi xảy ra"
                );
                setIsLoadingProfile(false);
            }
        };
        fetchData();
    }, [api]);

    return { profile, isLoadingProfile, errorProfile };
};

export default useGetProfile;
