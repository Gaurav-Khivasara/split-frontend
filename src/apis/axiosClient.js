import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_LINK}/api`,
  timeout: 10000,
  timeoutErrorMessage: "Request timed out!",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (requset) => {
    const token = localStorage.getItem("token");

    if (token) {
      requset.headers.Authorization = `Bearer ${token}`
    }

    return requset;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      toast.error(error.response.data.message + "\n:: axiosClient");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;