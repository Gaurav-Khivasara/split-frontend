import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { fetchWithAuth } from "../apis/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let loggedIn = false;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetchWithAuth({ path: `/api/users/get-by-token` });

      console.log("res", response);

      setUser(response.user);
      
      if (loggedIn) {
        toast.success("Logged in.");
        loggedIn = false;
      }
    } catch (err) {
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