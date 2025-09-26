import { useState } from "react";
import toast from "react-hot-toast";

import { fetchWithAuth } from "../apis/api";
import { colors } from "../utils/colors";

import Loader from "./Loader";

export default function FriendList({ friends, setFriends, fetchFriends }) {
  const [isLoading, setIsLoading] = useState(false);
  // const [friends, setFriends] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);

  //   try {
  //     const fetchFriends = async () => {
  //       const response = await fetchWithAuth({ path: "/api/friends/get" });
  //       console.log("fetchFriends:", response);

  //       setFriends(response.friends);
  //     };
  //     fetchFriends();
  //   } catch (err) {
  //     // console.error("fetchFriends error:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const handleAcceptRequest = async (sentBy) => {
    setIsLoading(true);

    try {
      const response = await fetchWithAuth({
        path: `/api/friends/accept?sentBy=${sentBy}`,
        method: "PUT"
      });

      if (response?.message) {
        setFriends((prev) =>
          prev.map(
            (friend) => friend.email === sentBy ? { ...friend, are_friends: true } : friend
          ).sort((a, b) => {
            if (a.are_friends === b.are_friends) {
              return new Date(b.updated_at) - new Date(a.updated_at);
            }

            if (a.are_friends && !b.are_friends) {
              return -1;
            }

            return 1;
          })
        );

        toast.success(response.message);
      } else {
        fetchFriends();
      }
    } catch (err) {
      // console.error("acceptRequest error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Should not be deleted if any expense exists between the two friends
  // So, until expenses are handled in backend cannot add delete for friends
  // const handleFriendDelete = async () => { };

  return (
    // return (isLoading && <Loader />) || (
    friends?.length > 0 ? (
      <ul className="friend-list">
        {friends.map((friend, idx) => (
          <li key={idx} className="friend-list-item" >
            <img src={friend.picture} style={{ backgroundColor: colors[idx % 26] }} alt="user-picture" />
            {friend.name}
            {/* {friend.are_friends && <button onClick={() => handleFriendDelete(friend)} ><img src="/src/icons/delete.png" alt="delete-icon" /></button>} */}
            {!friend.are_friends && <button onClick={() => handleAcceptRequest(friend.email)} >Accept request</button>}
          </li>
        ))}
      </ul>
    ) : (
      <div style={{ color: "#A0A0A0" }} >No friends...</div>
    )
  );
}