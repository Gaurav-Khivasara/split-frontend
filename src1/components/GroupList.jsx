import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchWithAuth } from "../apis/api";
import toast from "react-hot-toast";

export default function GroupList({ groups, setGroups }) {
  // const [groups, setGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchGroups = async () => {
        const response = await fetchWithAuth({ path: "/api/groups/get-all-by-user-id" });
        // console.log("fetchGroups:", response);

        response?.groups?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        setGroups(response?.groups);
      };
      fetchGroups();
    } catch (err) {
      // console.error("fetchGroups error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGroupDelete = async (groupId) => {
    try {
      const response = await fetchWithAuth({
        path: "/api/groups/delete",
        method: "PUT",
        payload: { groupId }
      });

      toast.success(response.message);
      setGroups((prev) => prev.filter((group) => group.id !== groupId));
    } catch (err) {
      // console.error("groupDelete error:", err);
    }
  };

  return (
    groups?.length > 0 ? (
      <ul className="group-list" >
        {groups.map((group, idx) => (
          <li key={idx} className="group-list-item" >
            <Link to={`/groups/${group.id}`} style={{ width: "100%" }} >
              {group.name}
            </Link>
            <button onClick={() => handleGroupDelete(group.id)} ><img src="/src/icons/delete.png" alt="delete-icon" /></button>
          </li>
        ))}
      </ul>
    ) : (
      <div style={{ color: "#A0A0A0" }} >No groups...</div>
    )
  );
}