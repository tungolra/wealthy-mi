import React from "react";
import Page from "../../components/page/Page";
import PageContent from "../../components/page-content/PageContent";
import PageHeader from "../../components/page-content/PageHeader";

import ExpenseTable from "./ExpenseTable";
import AddCategory from "./AddCategoryForm";
import AddExpense from "./AddExpenseForm";

export default function Expenses() {
  const userId = localStorage.getItem("user");

  return (
    <>
      <Page showTopbar={true}>
        <AddCategory />
        <AddExpense />
        <PageContent>
          <ExpenseTable userId={userId} />
        </PageContent>
      </Page>
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
