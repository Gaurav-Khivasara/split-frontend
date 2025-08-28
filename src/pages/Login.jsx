import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const serverLink = import.meta.env.VITE_SERVER_LINK;

export default function Login() {
  const { user } = useAuth();

  return (
    <>
      <h1>
        Login
        <br />
      </h1>
      <Link to="/test" >Test page</Link>
      <br /><br />
      {user ? (
        <h2>Already logged in!</h2>
      ) : (
        <Link to={`${serverLink}/auth/google`} className="google-btn" >
          <img width="70" height="70" src="/src/icons/google.svg" alt="google-logo" />
          <br />
          <span>
            Login with Google
          </span>
        </Link>
      )}
    </>
  );
}