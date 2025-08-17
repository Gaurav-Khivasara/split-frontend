import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getUserByToken } from "../apis/api";

const serverLink = import.meta.env.VITE_SERVER_LINK;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let loggedIn = false;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await getUserByToken();
      // const response = await fetch(`${serverLink}/api/users/get-by-token`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });

      if (response.status === 401) {
        throw new Error("401: Unauthorized\nSession expired or Invalid token!");
      }

      // if (!response.ok) {
      //   throw new Error("Session expired or Invalid token!");
      // }

      setUser(response.data.user);

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