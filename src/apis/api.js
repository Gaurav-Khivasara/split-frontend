import axiosClient from "./axiosClient";

export const getUserByToken = () => axiosClient.get("/users/get-by-token");

export const getAllFriendsByUser = () => axiosClient.get("/friends/get-all-by-user");
export const addFriend = (body) => axiosClient.post("/friends/add", body);