import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import AccountButton from "./AccountButton";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar" >
      <Link to="/" className="nav-brand" >
        <img src="/logo.png" alt="nav-brand" />
        SplitEase
      </Link>
      <AccountButton user={user} />
      {user && user?.picture && (
        <AccountButton user={user} />
      )}
    </nav>
  );
}