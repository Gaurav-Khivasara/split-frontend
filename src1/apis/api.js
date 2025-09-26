import toast from "react-hot-toast";

const serverLink = import.meta.env.VITE_SERVER_LINK;

export const fetchWithAuth = async ({ path, method = "GET", payload }) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(serverLink + path, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
      // toast.error(":: " + data.message);
      // if (data.message === "Missing or Invalid token!") {
      //   localStorage.removeItem("token");
      // }
      // return null;
    }

    // console.log("fetchWithAuth:", data);

    return data;
  } catch (err) {
    console.error("fetchWithAuth error:", err);

    if (err.message !== "Missing token!") {
      if (err.message === "Invalid token!") {
        localStorage.removeItem("token");
      }

      toast.error("-- " + err.message);
    }

    return null;
  }
};