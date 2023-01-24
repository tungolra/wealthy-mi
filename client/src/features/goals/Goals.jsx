import { useCreateGoalMutation, useGetGoalsQuery } from "../api/goalSlice";
import { useState } from "react";

function Goal() {
  const initialState = {};

  const userId = localStorage.getItem("user");
  const [createGoal] = useCreateGoalMutation();
  const [formData, setFormData] = useState(initialState);

  const { data: goals, isLoading, isSuccess, isError, error, refetch } =
    useGetGoalsQuery(userId);

  function handleChange(e) {
    setFormData({
      // ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createGoal(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {goals}
      <p>This is goals</p>
      <form onSubmit={handleSubmit}>
        <input></input>
      </form>
    </>
  );
}

export default Goal;
