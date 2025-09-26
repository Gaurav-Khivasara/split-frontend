import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";
import { fetchWithAuth } from "../apis/api";

import useDebounce from "../hooks/useDebounce";
import toastInfo from "../utils/toastInfo";

export default function AddExpenseDialog({ friends }) {
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

  const [description, setDescription] = useState("");
  const descriptionInpRef = useRef(null);

  // Dialog box event listeners and initial focus
  useEffect(() => {
    descriptionInpRef.current.focus();

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

  const handleAddExpense = () => { };

  const toggleMember = (event, friend) => {
    if (friend.id === user.id) {
      event.target.checked = true;
      return;
    }

    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedMemberIds((prev) => new Set([...prev, friend.id]));
    } else {
      setSelectedMemberIds((prev) => {
        const set = new Set(prev);
        set.delete(friend.id);
        return set;
      });
    }
  };

  return (
    <div className="add-expense-dialog-bg" >
      <div ref={dialogRef} className="add-expense-dialog" role="dialog" >
        <h2>Expense Details</h2>

        <button
          ref={closeButtonRef}
          onClick={() => setIsDialogOpen(false)}
          className="close-dialog-btn"
        >
          &#10006;
        </button>

        <form onSubmit={handleAddExpense} >
          <input
            type="text"
            name="name"
            placeholder="Expense description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            autoComplete="off"
            ref={descriptionInpRef}
            required
          />
          <br /><br />

          <h3>Split between, Group</h3>
          {/* <br />
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
          ))} */}

          <br />
          <input type="submit" value="Add" />
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
      </div>
    </div>
  );
}