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
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;