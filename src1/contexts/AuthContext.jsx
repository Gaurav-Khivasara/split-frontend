import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { fetchWithAuth } from "../apis/api";
import Loader from "../components/Loader";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth({ path: "/api/users/get" });

        // console.log("authFetchUser:", response);
        setUser(response?.user);

        if (response?.user) {
          toast.success("Logged in.");
        }
      } catch (err) {
        console.error("authFetchUser error:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");

    if (tokenParam) {
      localStorage.setItem("token", tokenParam);
      // Token aa gaya lekin user nahi aya, uske pehle 
      // // login nahi ho sakta
      // // S
      window.history.replaceState({}, document.title, "/");
    }

    fetchUser();
    // const token = localStorage.getItem("token");
    // if (token) {
    //   fetchUser();
    // }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }} >
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);