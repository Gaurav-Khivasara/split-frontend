import { useEffect, useState } from "react"
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";
import { fetchWithAuth } from "../apis/api";
import Loader from "./Loader";

export default function FriendList() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    try {
      const fetchFriends = async () => {
        const response = await fetchWithAuth({ path: "/api/friends/get-all-by-user" });
        console.log("response.message:", response.message);
        
        setFriends(response.friends);
      };
      fetchFriends();
    } catch (err) {
      // console.error("err:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendFriendRequest = async (event) => {
    event.preventDefault();

    const sentTo = event.target[0].value;

    if (sentTo === `${user.email}`) {
      toast.error("Same emails need not be friends!")
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchWithAuth({
        path: "/api/friends/add",
        method: "POST",
        payload: { sentTo }
      });

      console.log("response", response);
      toast.success(response.message);
    } catch (err) {
      // console.error("err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (sentBy) => {
    setIsLoading(true);

    try {
      const response = await fetchWithAuth({
        path: `/api/friends/accept?sentBy=${sentBy}`,
        method: "PUT"
      });

      console.log("response", response);
      toast.success(response.message);

      setFriends(friends.map((friend) => friend.email === sentBy ? { ...friend, are_friends: true } : friend));
    } catch (err) {
      // console.error("err", err);
    } finally {
      setIsLoading(false);
    }
  };

  // return (isLoading && <Loader />) || (
  return (
    <div className="friend-list-container">
      <h3>Friends</h3>
      <form onSubmit={handleSendFriendRequest} >
        <input type="email"
          placeholder="example@gmail.com"
          pattern="[a-zA-Z0-9._%+\-]+@gmail\.com"
          onInvalid={(event) => event.target.setCustomValidity("Please enter a valid Gmail address (example@gmail.com)")}
          required />
        <input type="submit" value="Send friend request" />
      </form>
      <br />
      {friends?.map((friend) => (
        <div key={friend.id} >
          {friend.id + ": " + friend.name}
          {!friend.are_friends && <button onClick={() => handleAcceptRequest(friend.email)} >Accept request</button>}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}