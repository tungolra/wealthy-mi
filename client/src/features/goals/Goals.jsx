import { useCreateGoalMutation, useGetGoalsQuery } from "../api/goalSlice";
import { useState } from "react";
import EditGoalModal from "./EditGoal";

function Goal() {
  const initialState = {
    targetDate: "",
    name: "",
    value: 0,
  };

  const userId = localStorage.getItem("user");
  const [createGoal] = useCreateGoalMutation();
  const [formData, setFormData] = useState(initialState);

  const { data: goals, isLoading, isSuccess, isError, error, refetch } =
    useGetGoalsQuery(userId);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await createGoal(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isSuccess
        ? goals.map((goal) => {
          return <p>{goal.name}</p>;
        })
        : <></>}
      <p>This is goals</p>
      <form onSubmit={handleSubmit}>
        <div className="container ">
          <div className="row">
            <input
              className="form-control col"
              name="name"
              placeholder="Title"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="form-control col"
              name="value"
              placeholder="Value"
              type="text"
              value={formData.value}
              onChange={handleChange}
            />
            <input
              className="form-control col"
              name="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={handleChange}
            />
            <button
              className="btn btn-success text-white btn-sm mx-1 col-auto"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Goal;
