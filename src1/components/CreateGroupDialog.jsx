import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";
import { fetchWithAuth } from "../apis/api";

import useDebounce from "../hooks/useDebounce";
import toastInfo from "../utils/toastInfo";

export default function CreateGroupDialog({ setIsDialogOpen, friends, setGroups }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [friendQuery, setFriendQuery] = useState("");
  const debouncedQuery = useDebounce(friendQuery, 300);
  // const [suggestions, setSuggestions] = useState([]);

  const { user } = useAuth();
  // const [selectedMembers, setSelectedMembers] = useState([user]);
  const [selectedMemberIds, setSelectedMemberIds] = useState(new Set());

  const suggestions = useMemo(() => {
    // if (debouncedQuery.length > 0) {
    return (friends || []).filter((friend) => {
      if (!friend || selectedMemberIds.has(friend.id)) {
        return false;
      }

      return (
        friend.email.toLowerCase().includes(debouncedQuery) ||
        friend.name.toLowerCase().includes(debouncedQuery)
      );
    });
    // }

    // return [];
  }, [debouncedQuery, friends, selectedMemberIds]);

  const selectedMembers = useMemo(() => {
    const members = (friends || []).filter((friend) => {
      if (!friend || !selectedMemberIds.has(friend.id)) {
        return false;
      }

      return true;
    });
    members.unshift(user);

    return members;
  }, [selectedMemberIds, friends, debouncedQuery]);

  const [groupName, setGroupName] = useState("");
  const groupNameInpRef = useRef(null);

  // Dialog box event listeners and initial focus
  useEffect(() => {
    groupNameInpRef.current.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDialogOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if ((dialogRef.current && !dialogRef.current.contains(event.target)) ||
        (closeButtonRef.current && closeButtonRef.current.contains(event.target))) {
        setIsDialogOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Debounce query
  // useEffect(() => {
  //   const timeout = setTimeout(() => setDebouncedQuery(friendQuery), 500);

  //   return () => {clearTimeout(timeout);
  // }, [friendQuery]);

  // Handling search
  // useEffect(() => {
  //   const filteredFriends = friends?.filter((friend) =>
  //     debouncedQuery.length > 0 &&
  //     !selectedMemberIds.has(friend.id) &&
  //     (friend.email.toLowerCase().includes(debouncedQuery) ||
  //       friend.name.toLowerCase().includes(debouncedQuery))
  //   );
  //   // setSuggestions(filteredFriends);
  // }, [debouncedQuery]);

  const handleCreateGroup = async (event) => {
    event.preventDefault();

    if (selectedMemberIds.size === 0) {
      toastInfo("Please add at least one member other than yourself.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchWithAuth({
        path: "/api/groups/add",
        method: "POST",
        payload: { name: groupName, userIds: [...selectedMemberIds] }
      });
      // const addGroupResponse = await fetchWithAuth({
      //   path: "/api/groups/add",
      //   method: "POST",
      //   payload: { name: groupName }
      // });

      // console.log("addGroupResponse:", addGroupResponse);

      // if (addGroupResponse) {
      //   toast.success(addGroupResponse.message);

      //   const addMembersResponse = await fetchWithAuth({
      //     path: "/api/group-members/add",
      //     method: "POST",
      //     payload: { groupId: addGroupResponse.group.id, userIds: [...selectedMemberIds] }
      //   });

      //   // console.log("addMembersResponse:", addMembersResponse);

      //   if (addMembersResponse) {
      //     // toast.success(addGroupResponse.message);
      //     toast.success(addMembersResponse.message);

      //     setGroups((prev) => [...(prev || []), addGroupResponse.group].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
      //     setIsDialogOpen(false);
      //   } else {
      //     // TODO DOUBT
      //     // If failed to addMembers then, delete group ?
      //     // Delete Group or create the group without members ?
      //   }
      // }

      // console.log("createGroup:", response);
      toast.success(response.message);

      setGroups((prev) => [...(prev || []), response.group].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Group creation error:", err);
    }
  };

  const toggleMember = (event, friend) => {
    if (friend.id === user.id) {
      event.target.checked = true;
      return;
    }

    const isChecked = event.target.checked;
    if (isChecked) {
      // setSuggestions((prev) => prev.filter((pf) => pf.id !== friend.id));
      setSelectedMemberIds((prev) => new Set([...prev, friend.id]));

      // if (!selectedMemberIds.has(friend.id)) {
      //   setSelectedMembers((prev) => [...prev, friend]);
      // }
    } else {
      // setSuggestions((prev) =>
      //   debouncedQuery.length > 0 &&
      //     (friend.email.toLowerCase().includes(debouncedQuery) ||
      //       friend.name.toLowerCase().includes(debouncedQuery)) ? [...prev, friend] : prev
      // );
      // setSuggestions((prev) => [...prev, friend]);

      setSelectedMemberIds((prev) => {
        const set = new Set(prev);
        set.delete(friend.id);
        return set;
      });

      // setSelectedMembers((prev) => prev.filter((pf) => pf.id !== friend.id));
    }
  };

  return (
    <div className="create-group-dialog-bg" >
      <div ref={dialogRef} className="create-group-dialog" role="dialog" >
        <h2>Group Details</h2>

        <button
          ref={closeButtonRef}
          onClick={() => setIsDialogOpen(false)}
          className="close-dialog-btn"
        >
          &#10006;
        </button>

        <form onSubmit={handleCreateGroup} >
          <input
            type="text"
            name="name"
            placeholder="Group name"
            onChange={(event) => setGroupName(event.target.value)}
            value={groupName}
            autoComplete="off"
            ref={groupNameInpRef}
            required
          />
          <br /><br />

          <h3>Group Members</h3>
          <br />
          {selectedMembers.map((mem) => (
            <label key={mem.id} >
              <input
                type="checkbox"
                name="selectedMemberIds[]"
                onChange={(event) => toggleMember(event, mem)}
                value={mem.id}
                disabled={user.id === mem.id}
                defaultChecked
              />
              {" " + mem.name + ", " + mem.email}
              <br />
            </label>
          ))}

          <br />
          <input type="submit" value="Create" />
        </form>

        <br />
        <input
          type="search"
          id="search-users"
          onChange={(event) => setFriendQuery(event.target.value.toLowerCase())}
          value={friendQuery}
          placeholder="Search users"
        />

        <br />
        <button className="suggestions-select-all-btn"
          onClick={() => setSelectedMemberIds((prev) => new Set([...prev, ...suggestions?.map((friend) => friend.id)]))}
        >Select all</button>

        <button className="suggestions-clear-btn" style={{ marginLeft: "10px" }}
          onClick={() => setSelectedMemberIds(new Set())}
        >Clear</button>

        {suggestions.length === 0 && debouncedQuery.length > 0 ? (
          <span style={{ color: "#A0A0A0" }} ><br />No friend with given input exists or they are already in the group.</span>
        ) : suggestions.map((friend) => (
          <label key={friend.id} >
            <br />
            <input type="checkbox" onChange={(event) => toggleMember(event, friend)} value={friend.id} />
            {" " + friend.name + ", " + friend.email}
          </label>
        ))}

        {/* <h3>Select Group Members</h3>
        {friends?.map((friend) => {
          const isChecked = selectedFriendIds.includes(friend.id);
          const imageUrl = friend.picture || `/default-profile-pics/${isChecked ? "checked" : "unchecked"}/${friend.name[0].toLowerCase()}.svg`;
          const highlight = isChecked ? "#CDCDCD": "";

          return (
            <div key={friend.id} >
              <label key={friend.id} className="checkbox-label" style={{ backgroundColor: highlight }} >
                <input
                  type="checkbox"
                  name="members"
                  value={friend.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(friend.id)}
                  className="checkbox-img"
                />
                <span className="custom-checkbox" style={{ backgroundImage: `url("${imageUrl}")` }} ></span>
                {friend.name}
              </label>
              <br />
            </div>
          );
        })} */}
      </div>
    </div>
  );
}