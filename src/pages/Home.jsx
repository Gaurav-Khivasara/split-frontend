import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import LogoutButton from "../components/LogoutButton";
import FriendList from "../components/FriendList";
import Loader from "../components/Loader";

export default function Home() {
  const { user, setUser, isLoading, setIsLoading } = useAuth();

  const Card = () => {
    return (
      <div className="card" >
        <div className="title" >
          Test
        </div>
        <div className="content" >
          Lorem ipsum dolor sit amet ₹50.00.
        </div>
      </div>
    );
  };

  return (isLoading && <Loader />) || (
    <>
      <h1>
        Home
        <br />
      </h1>
      <Link to="/test" >Test page</Link>
      <br /><br />
      {user && (
        <>
          <Card />
          <br /><br />
          <LogoutButton setUser={setUser} />
          <br /><br />
          <FriendList />
        </>
      )}
      <img src="/src/icons/games.png" alt="test" height={30} width={30} />
    </>
  );
}