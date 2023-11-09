import axios from "axios";
import publicApi from "./PublicApi";

const privateApi = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

privateApi.interceptors.request.use(
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

privateApi.interceptors.response.use(
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

export default privateApi;
