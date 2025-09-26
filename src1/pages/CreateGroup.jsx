import { useEffect, useState } from "react";

export default function CreateGroup() {
  const [searchedFriend, setSearchedFriend] = useState("");

  useEffect(() => { }, [searchedFriend]);

  return (
    <>
      <h1>Group Details</h1>
      <label>
        Group name:{" "}
        <input type="text" />
      </label>
      <br /><br />
      <h2>Add members</h2>
      <label>
        Search friend
        <input type="search" onChange={(event) => setSearchedFriend(event.target.value)} value={searchedFriend} />
      </label>
    </>
  );
}