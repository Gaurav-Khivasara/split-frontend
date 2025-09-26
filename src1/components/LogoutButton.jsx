import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";

export default function LogoutButton() {
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out.");
  };

  return (
    <button onClick={handleLogout} >Logout</button>
  );
}