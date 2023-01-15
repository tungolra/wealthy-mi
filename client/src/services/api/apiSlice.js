import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://blog.openreplay.com/fetching-data-in-redux-using-rtk-query/
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
    // updateExpense
    // deleteExpense
  }),
});

export const { useGetExpensesQuery } = apiSlice;
