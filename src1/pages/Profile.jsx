import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    user ? (
      <div className="profile" >
        <h1>Welcome, {user?.name}</h1>

        <img src={user?.picture} alt="user-picture" />

        <h2>{user?.email}</h2>
      </div>
    ) : (
      <h2>Login first</h2>
    )
  );
}