import toast from "react-hot-toast";

export default function LogoutButton({ setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <button onClick={handleLogout} >Logout</button>
  );
}