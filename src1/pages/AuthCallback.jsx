import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthCallback() {
  useEffect(() => {
    toast.success("Logged in");
    window.history.replaceState({}, "AuthCallback", "/");
  }, []);

  return (
    <h1>
      Loading...
    </h1>
  );
}