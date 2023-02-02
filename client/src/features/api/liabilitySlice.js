import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const liabilitySlice = createApi({
  reducerPath: "liability",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Liability"],
  endpoints: (builder) => ({
    getLiabilities: builder.query({
      query: (id) => `liabilities/${id}`,
      providesTags: ["Liability"],
    }),
    createLiability: builder.mutation({
      query: (data) => ({
        url: `liabilities/create/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Liability"],
    }),
    deleteLiability: builder.mutation({
      query: (id) => ({
        url: `liabilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Liability"],
    }),
    updateLiability: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `liabilities/${userId}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Liability"],
    }),
  }),
});

export const {
  useGetLiabilitiesQuery,
  useCreateLiabilityMutation,
  useDeleteLiabilityMutation,
  useUpdateLiabilityMutation,
} = liabilitySlice;
