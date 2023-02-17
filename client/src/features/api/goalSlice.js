import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const goalSlice = createApi({
  reducerPath: "goals",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3001/",
    baseUrl: "https://wealthy-mi.herokuapp.com/",
  }),
  tagTypes: ["Goal"],
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: (id) => `goals/${id}`,
      providesTags: ["Goal"],
    }),
    createGoal: builder.mutation({
      query: (data) => ({
        url: `goals/create/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Goal"],
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({
        url: `goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goal"],
    }),
    updateGoal: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `goals/${userId}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Goal"],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useUpdateGoalMutation,
} = goalSlice;
