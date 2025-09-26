import { useState } from "react";

import toastInfo from "../utils/toastInfo.jsx";

import GroupList from "./GroupList";
import CreateGroupDialog from "./CreateGroupDialog";

export default function Groups({ friends }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  return (
    <div className="groups" >
      <h3>Groups</h3>

      <button id="create-group-btn"
        onClick={() => ((friends?.length > 0) ? setIsDialogOpen(true) :
          toastInfo("Add friends to create groups."))}
      >Create Group</button>

      {isDialogOpen && <CreateGroupDialog setIsDialogOpen={setIsDialogOpen} friends={friends} setGroups={setGroups} />}
      {/* <CreateGroupDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} friends={friends} /> */}

      <GroupList groups={groups} setGroups={setGroups} />
    </div>
  );
}