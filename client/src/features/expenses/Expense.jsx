import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetExpensesQuery } from "../../services/api/apiSlice";

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
  // const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState([]);

  const user = localStorage.getItem("user");

  const {
    data: expenses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExpensesQuery(user);

  // console.log(expenses);
  // expenses?.map((element) => {
  //   console.log(element.vendor);
  //   console.log(element.posted);
  // });

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
            {expenses?.map((expense) => {
              <tr>
                <th>
                  <em> {expense?.vendor} </em>
                </th>
                <th>
                  <em>{expense?.category.name}</em>
                </th>
                <th> {expense?.posted} </th>
                <th>
                  <em>{expense?.value}</em>
                </th>
              </tr>;
            })}
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
