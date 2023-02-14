import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const assetSlice = createApi({
  reducerPath: "assets",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Asset"],
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: (id) => `assets/${id}`,
      providesTags: ["Asset"],
    }),
    createAsset: builder.mutation({
      query: (data) => ({
        url: `assets/create/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Asset"],
    }),
    deleteAsset: builder.mutation({
      query: (id) => ({
        url: `assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Asset"],
    }),
    updateAsset: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `assets/${userId}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Asset"],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useUpdateAssetMutation,
} = assetSlice;
