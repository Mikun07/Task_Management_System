import { AxiosInstance } from "axios";
import { EnhancedStore } from "@reduxjs/toolkit";
declare const axiosInstance: AxiosInstance;
export declare const useInterceptor: (instance: AxiosInstance, store: EnhancedStore) => void;
export default axiosInstance;
