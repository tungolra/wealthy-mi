import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetExpensesQuery,
  useCreateExpenseMutation,
} from "../../services/api/apiSlice";

function Category() {
  const [formData, setFormData] = useState([]);

  function handleSubmit() {}

  return (
    <div className="category-form">
      <h2>Add a Category</h2>
      <form onClick={handleSubmit}>
        <label>Category Name</label>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function Expenses() {
  const dispatch = useDispatch();
  // const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [formData, setFormData] = useState([]);

  const user = localStorage.getItem("user");

  const {
    data: expenses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExpensesQuery(user);

  console.log(expenses);

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(useCreateExpenseMutation(formData, user))
  }

  return (
    <>
      <h1>Expense Page</h1>
      <Category />
      <div className="expenses-container">
        <h2>Expenses</h2>
        {/* refactor into separate component */}
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Category</th>
              <th>Transaction Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense) => (
              <tr>
                <th>{expense?.vendor}</th>
                <th>{expense?.category.name}</th>
                {/* temp date slice without using Moment */}
                <th> {expense?.posted.slice(0, 10)} </th>
                <th>${expense?.value}.00</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="expense-form">
        <h2>Add an Expense</h2>
        <form onClick={handleSubmit}>
          <label>Vendor</label>
          <input type="text" />
          <label>Category</label>
          <input type="text" />
          <label>Transaction Date</label>
          <input type="text" />
          <label>Amount</label>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
