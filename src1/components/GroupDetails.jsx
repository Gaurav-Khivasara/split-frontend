import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchWithAuth } from "../apis/api";

export default function GroupDetails({ friends }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetchWithAuth({ path: `/api/groups/${id}` });
        console.log(response);
        setGroup(response.group);
        setExpenses(response.expenses);
      } catch (err) {
        console.error("Group details error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGroup();
  }, []);

  const handleAddExpense = async () => { };

  return (
    <div>
      {isDialogOpen && <AddExpenseDialog friends={friends} />}

      <button onClick={handleAddExpense} >Add expense</button>
      {!isLoading &&
        <>
          Group id: {group.id}
          <br />
          Group name: {group.name}
          <br />
          Group created by: {group.created_by}
          <br />
          Group created at: {group.created_at}
          <br />
          Group updated at: {group.updated_at}
          <br /><br />
          <ul>
            {expenses.map((expense) => {
              <li>
                {expense.description}
                {expense.cost}
                {expense.added_by}
                {expense.group_id}
                {expense.category}
                {expense.added_at}
                {expense.updated_at}
              </li>;
            })}
          </ul>
        </>
      }
    </div>
  );
}