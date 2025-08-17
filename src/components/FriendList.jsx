import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const serverLink = import.meta.env.VITE_SERVER_LINK;

import { useAuth } from "../contexts/AuthContext";
import { addFriend, getAllFriendsByUser } from "../apis/api";

export default function FriendList() {
  const { user, setIsLoading: setAuthLoading } = useAuth();
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    setAuthLoading(true);

    try {
      const get = async () => {
        const response = await getAllFriendsByUser();
        // const response = await fetch(`${serverLink}/api/friends/get-all-by-user`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });

        if (response.status === 200) {
          console.log(response.data);
          setFriends(response.data.friends);
        }
      };
      get();
    } catch (err) {
      // Handled in axiosClient
      // console.error("err:", err.message);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleSentToChange = (event) => {
    const email = event.target.value;
    setSentTo(email);
  };

  const handleSendFriendRequest = async (event) => {
    event.preventDefault();

    if (sentTo === `${user.email}`) {
      alert("Same emails need not be friends!");
    }

    setAuthLoading(true);

    try {
      const response = await addFriend({
        sentBy: `${user.email}`,
        sentTo
      });
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

      console.log("response.data", response.data);
      toast.success(response.data.message);
    } catch (err) {
      // Handled in axiosClient
      // console.error("err:", err);
    } finally {
      setSentTo("");
      setAuthLoading(false);
    }
  };

  return (
    <div className="friend-list-container">
      <h3>Friends</h3>
      <form onSubmit={handleSendFriendRequest} >
        <input type="email"
          placeholder="example@gmail.com"
          onChange={handleSentToChange}
          value={sentTo}
          // pattern="[a-zA-Z0-9._%+\-]+@gmail\.com"
          onInvalid={() => alert("Please enter a valid Gmail address (example@gmail.com)")}
          required />
        <input type="submit" value="Send friend request" />
      </form>
      {friends.map((friend) => (
        <p key={friend.id} >
          {friend.id + ": " + friend.name}
        </p>
      ))}
    </div>
  );
}