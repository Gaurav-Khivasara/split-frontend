import toast from "react-hot-toast";
// import axiosClient from "./axiosClient";

const serverLink = import.meta.env.VITE_SERVER_LINK;

// export const getUserByToken = () => axiosClient.get("/users/get-by-token");

// export const getAllFriendsByUser = () => axiosClient.get("/friends/get-all-by-user");
// export const addFriend = (body) => axiosClient.post("/friends/add", body);

export const fetchWithAuth = async ({ path, method = "GET", payload }) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(serverLink + path, options);
    const data = await response.json();

    if (!response.ok) {
      // throw new Error(data.message);
      toast.error(":: " + data.message);
      return null;
    }

    // console.log("fetchedData:", data);
    
    return data;
  } catch (err) {
    console.log(err);
    toast.error("-- " + err.message);
  }
};