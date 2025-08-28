import { useEffect, useState } from "react"
import toast from "react-hot-toast";

// const serverLink = import.meta.env.VITE_SERVER_LINK;

import { useAuth } from "../contexts/AuthContext";
// import { addFriend, fetchWithAuth, getAllFriendsByUser } from "../apis/api";
import { fetchWithAuth } from "../apis/api";
import Loader from "./Loader";

export default function FriendList() {
  const { user } = useAuth();
  // const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  // const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    setIsLoading(true);

    try {
      const fetchFriends = async () => {
        // const response = await getAllFriendsByUser();
        // const response = await fetch(`${serverLink}/api/friends/get-all-by-user`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        const response = await fetchWithAuth({ path: "/api/friends/get-all-by-user" });
        console.log("response.message:", response.message);
        
        setFriends(response.friends);
      };
      fetchFriends();
    } catch (err) {
      // Handled in axiosClient
      // console.error("err:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const handleSentToChange = (event) => {
  //   const email = event.target.value;
  //   setSentTo(email);
  // };

  const handleSendFriendRequest = async (event) => {
    event.preventDefault();

    const sentTo = event.target[0].value;

    if (sentTo === `${user.email}`) {
      // alert("Same emails need not be friends!");
      toast.error("Same emails need not be friends!")
      return;
    }

    setIsLoading(true);

    try {
      // const response = await addFriend({
      //   sentTo
      // });
      // const response = await fetch(`${serverLink}/api/friends/add`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     sentBy: `${user.email}`,
      //     sentTo
      //   })
      // });
      const response = await fetchWithAuth({
        path: "/api/friends/add",
        method: "POST",
        payload: { sentTo }
      });

      console.log("response", response);
      toast.success(response.message);
    } catch (err) {
      // Handled in axiosClient
      // console.error("err:", err);
    } finally {
      // setSentTo("");
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
          // onChange={handleSentToChange}
          // value={sentTo}
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