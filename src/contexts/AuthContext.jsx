import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { fetchWithAuth } from "../apis/api";

// const serverLink = import.meta.env.VITE_SERVER_LINK;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let loggedIn = false;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      // const response = await getUserByToken();
      // const token = localStorage.getItem("token");
      // const response = await fetch(`${serverLink}/api/users/get-by-token`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      const response = await fetchWithAuth({ path: `/api/users/get-by-token` });

      console.log("res", response);
      // console.log("res.status", response.status);
      // console.log("res.ok", response.ok);
      // console.log("res.user", response.user);

      setUser(response.user);
      
      if (loggedIn) {
        toast.success("Logged in.");
        loggedIn = false;
      }
    } catch (err) {
      // Handled in axiosClient
      // console.error("err", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // toast.success("Logged in.");
      loggedIn = true;
      window.history.replaceState({}, document.title, "/");
    }
  }, [fetchUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }} >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);