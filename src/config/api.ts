import axios from "axios";
export const BASE_URL = "https://www.visaodenegocios.xyz/";

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("clientToken")}`,},
  withCredentials: true, 
});

export default axiosInstance;
