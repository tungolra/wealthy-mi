import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const assetSlice = createApi({
  reducerPath: "income",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Income"],
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: (id) => `income/${id}`,
      providesTags: ["Income"],
    }),
    createIncome: builder.mutation({
      query: (data) => ({
        url: `income/create/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Income"],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `income/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Income"],
    }),
    updateIncome: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `income/${userId}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Income"],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useCreateIncomeMutation,
  useDeleteIncomeMutation,
  useUpdateIncomeMutation,
} = assetSlice;
