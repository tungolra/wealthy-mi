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
import AddExpense from "./AddExpenseForm";

export default function Expenses() {
  const userId = localStorage.getItem("user");

  return (
    <>
      <Page showTopbar={false}>
        <PageHeader title="Track My Expenses" actions={[]}></PageHeader>
        <AddCategory />
        <AddExpense />
        <PageContent>
          <ExpenseList userId={userId} />
        </PageContent>
      </Page>
    </>
  );
}
