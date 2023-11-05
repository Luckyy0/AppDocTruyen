import { useEffect } from "react";
import privateApi from "../api/PrivateApi";
import publicApi from "../api/PublicApi";

const refreshToken = async () => {
    try {
        
        const response = await publicApi.post("/refreshToken", {
            token: localStorage?.getItem("refreshToken") || "",
        });
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        return accessToken;
    } catch (err) {
        console.log(err.response.data.message);
        return Promise.reject(err);
    }
};

const usePrivateApi = () => {
    useEffect(() => {
        const requestIntercept = privateApi.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${
                        localStorage?.getItem("token") || ""
                    }`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseIntercept = privateApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    console.log("refresh token")
                    const newToken = await refreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return privateApi(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            privateApi.interceptors.request.eject(requestIntercept);
            privateApi.interceptors.response.eject(responseIntercept);
        };
    }, []);
    return privateApi;
};

export default usePrivateApi;
