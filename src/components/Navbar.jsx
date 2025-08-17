import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import AccountButton from "./AccountButton";

export default function Navbar() {
  const { user, setUser } = useAuth();

  return (
    <nav className="navbar" >
      <Link to="/" className="nav-brand" >
        <img src="/logo.png" alt="nav-brand" />
        SplitEase
      </Link>
      {user && user.avatar ? (
        <AccountButton user={user} setUser={setUser} />
      ) : (
        <Link to="/login" >Login</Link>
      )}
    </nav>
  );
}