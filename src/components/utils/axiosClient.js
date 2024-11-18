import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 3000,
});

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
