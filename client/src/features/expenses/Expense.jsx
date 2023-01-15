import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useGetExpensesQuery } from "../api/apiSlice";

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

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState([]);

  // const {
  //   data: expenses,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetExpensesQuery();

  //placeholder date for formatting view
  const d = new Date(Date.now());

  function handleSubmit() {}

  return (
    <>
      <h1>Expense Page</h1>
      <Category />
      <div className="expenses-container">
        <h2>Expenses</h2>
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
            <tr>
              {/* map start */}
              <th>
                <em> Vendor_name </em>
              </th>
              <th>
                <em>category_name</em>
              </th>
              <th> {d.toString()} </th>
              <th>
                <em>$50.00</em>
              </th>
              {/* map end */}
            </tr>
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
