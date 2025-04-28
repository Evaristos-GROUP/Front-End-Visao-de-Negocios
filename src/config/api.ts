import axios from "axios";
//export const BASE_URL =" http://172.16.137.255:8080/";
export const BASE_URL = "http://177.8.166.137:6060/";

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("clientToken")}`,},
  withCredentials: true, 
});

export default axiosInstance;
