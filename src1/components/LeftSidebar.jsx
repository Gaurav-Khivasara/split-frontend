import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { fetchWithAuth } from "../apis/api";

import Friends from "./Friends";
import Groups from "./Groups";

export default function Sidebar() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFriends = useCallback(async () => {
    const response = await fetchWithAuth({ path: "/api/friends/get" });
    // console.log("fetchFriends:", response);

    response?.friends?.sort((a, b) => {
      if (a.are_friends === b.are_friends) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }

      if (a.are_friends && !b.are_friends) {
        return -1;
      }

      return 1;
    });

    setFriends(response?.friends);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    try {
      fetchFriends();
    } catch (err) {
      // console.error("fetchFriends error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return (
    user && (
      <section className="left-sidebar" >
        <Groups friends={friends} />
        <br />
        <Friends friends={friends} setFriends={setFriends} fetchFriends={fetchFriends} />
      </section>
    )
  );
}