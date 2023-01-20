import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateExpenseMutation } from "../api/expenseSlice";

import { useGetCategoriesQuery } from "../api/categorySlice";
import Page from "../../components/page/Page";
import PageContent from "../../components/page-content/PageContent";
import PageHeader from "../../components/page-content/PageHeader";

import ExpenseList from "./ExpenseTable";
import AddCategory from "./AddCategoryForm";

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
      {/* For rendering only */}
      {
        /* <ul>
        <label htmlFor="">Categories</label>
        {categories.map((c) => (
          <li>{c}</li>
        ))}
      </ul> */
      }
      <Page showTopbar={false}>
        <PageHeader title="Track My Expenses" actions={[]}></PageHeader>
        <PageContent></PageContent>
        <PageContent>
          <AddCategory />
          <ExpenseList userId={userId} />
          {/* refactor to place in CreateExpense component */}
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
        </PageContent>
      </Page>
    </>
  );
}
