import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
} from "../../services/api/apiSlice";

function AddCategory() {
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

function ExpenseList({ userId }) {
  const {
    data: expenses,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetExpensesQuery(userId);

  const [deleteExpense] = useDeleteExpenseMutation()

  function handleDelete(id) {
    deleteExpense(id)
  }

  return (
    <div className="expenses-container">
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, idx) => (
            <tr key={idx}>
              <th>{expense?.vendor}</th>
              <th>{expense?.category}</th>
              {/* temp date slice without using Moment */}
              <th> {expense?.posted.slice(0, 10)} </th>
              <th>${expense?.value}</th>
              <th>
                <button onClick={() => handleDelete(expense._id)}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Expenses() {
  const userId = localStorage.getItem("user");
  // const [filteredExpenses, setFilteredExpenses] = useState([]);
  const initialState = {
    vendor: "",
    category: "",
    posted: "",
    value: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [createExpense] = useCreateExpenseMutation();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createExpense(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Expense Page</h1>
      <AddCategory />
      <ExpenseList userId={userId} />
      {/* refactor to place in CreateExpense component */}
      <div className="expense-form">
        <h2>Add an Expense</h2>
        <form onSubmit={handleSubmit}>
          <label>Vendor</label>
          <input
            name="vendor"
            type="text"
            value={formData.vendor}
            onChange={handleChange}
          />
          <label>Category</label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
          />
          <label>Transaction Date</label>
          <input
            name="posted"
            type="date"
            value={formData.posted}
            onChange={handleChange}
          />
          <label>Amount</label>
          <input
            name="value"
            type="number"
            min="0"
            step="0.01"
            value={formData.value}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
