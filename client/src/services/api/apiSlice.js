import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://blog.openreplay.com/fetching-data-in-redux-using-rtk-query/
const userId = localStorage.getItem("user")

export const apiSlice = createApi({
  reducerPath: "api",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (id) => `/expenses/${id}`,
    }),
    // createExpense
    createExpense: builder.mutation({
      query: (data) => ({
        url: `/expenses/create/${userId}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`, 
        method: "DELETE"
      })
    })
    // updateExpense
    // deleteExpense
  }),
});

export const { useGetExpensesQuery, useCreateExpenseMutation, useDeleteExpenseMutation } = apiSlice;
