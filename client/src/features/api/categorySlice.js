import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const categorySlice = createApi({
  reducerPath: "category",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (id) => `categories/${id}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (category) => ({
        url: `categories/${userId}`,
        method: "DELETE",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: (category) => ({
        url: `categories/${userId}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    // updateCategory
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useEditCategoryMutation,
} = categorySlice;
