import { useCreateIncomeMutation, useGetIncomeQuery } from "../api/incomeSlice";
import { useState } from "react";

function Income() {
  const initialState = {};

  const userId = localStorage.getItem("user");
  const [createIncome] = useCreateIncomeMutation();
  const [formData, setFormData] = useState(initialState);

  const { data: income, isLoading, isSuccess, isError, error, refetch } =
    useGetIncomeQuery(userId);

  function handleChange(e) {
    setFormData({
      // ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createIncome(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {income}
      <p>This is income</p>
      <form onSubmit={handleSubmit}>
        <input></input>
      </form>
    </>
  );
}

export default Income;
