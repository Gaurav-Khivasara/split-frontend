import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";
import { fetchWithAuth } from "../apis/api";
import toastInfo from "../utils/toastInfo";

import FriendList from "./FriendList";

export default function ({ friends, setFriends, fetchFriends }) {
  const { user } = useAuth();

  const [sentTo, setSentTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendFriendRequest = async (event) => {
    event.preventDefault();

    if (sentTo === user.email) {
      toastInfo("Same emails need not be friends.");
      setSentTo("");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchWithAuth({
        path: "/api/friends/add",
        method: "POST",
        payload: { sentTo }
      });

      // console.log("sendFriendRequest:", response);

      setSentTo("");
      toast.success(response.message);
    } catch (err) {
      // console.error("sendFriendRequest error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (event) => {
    const input = event.target;
    input.setCustomValidity("");

    if (!input.validity.valid) {
      input.setCustomValidity("Please enter a valid Gmail address (example@gmail.com)");
    }
  };

  return (
    <div className="friends" >
      <h3>Friends</h3>

      <form onSubmit={handleSendFriendRequest} >
        <input type="email"
          name="email"
          value={sentTo}
          placeholder="example@gmail.com"
          // pattern="^[a-zA-Z0-9._%+\-]+@gmail\.com$"
          onChange={(event) => setSentTo(event.target.value.trim())}
          onInput={validateEmail}
          autoComplete="off"
          required
        />

        <input type="submit" value="Send friend request" />
      </form>

      <FriendList friends={friends} setFriends={setFriends} fetchFriends={fetchFriends} />
    </div>
  );
}