import React from "react";
import { useState } from "react";
import {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
} from "../api/expenseSlice";
import { useGetCategoriesQuery } from "../api/categorySlice";

function ExpenseList({ userId }) {
  const {
    data: expenses,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetExpensesQuery(userId);
  const [deleteExpense] = useDeleteExpenseMutation();

  function sortList(type) {}

  function handleDelete(id) {
    deleteExpense(id);
  }

  return (
    <div className="expenses-container">
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Edit</th>
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
              <th>
                <button> √</button>
              </th>
              <th>{expense?.vendor}</th>
              <th>{expense?.category}</th>
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

function AddExpense(props) {
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
      <h2>Add an Expense</h2>
      <div className="expense-form">
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
            list="categories"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
          />
          <datalist name="category" id="categories">
            {props.categories?.map((c) => (
              <option
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
              >
                {c}
              </option>
            ))}
          </datalist>
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

export default function Expenses() {
  const userId = localStorage.getItem("user");
  // const [filteredExpenses, setFilteredExpenses] = useState([]);

  const {
    data: categories,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetCategoriesQuery(userId);

  return (
    <>
      {/* For rendering only */}
      {/* <ul>
        <label htmlFor="">Categories</label>
        {categories.map((c) => (
          <li>{c}</li>
        ))}
      </ul> */}
      <h1>Expense Page</h1>
      <ExpenseList userId={userId} />
      <AddExpense userId={userId} categories={categories} />
    </>
  );
}
