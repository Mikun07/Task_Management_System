import { BASE_URL } from "@/config/api";
import { userToken } from "@/config/auth";
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export const useInterceptor = (instance, store) => {
    instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${userToken || JSON.parse(localStorage.getItem("userToken"))}`;
        return config;
    });
    instance.interceptors.response.use((response) => response, async (error) => {
        const originalRequest = error?.config;
        const errorResponse = error?.response.status;
        if (errorResponse && errorResponse === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                localStorage.removeItem("userToken");
                location.assign("/login");
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    });
};
export default axiosInstance;
