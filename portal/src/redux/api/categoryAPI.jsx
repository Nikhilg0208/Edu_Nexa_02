import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryAPI = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/course/`,
  }),
  tagTypes: ["categoryApi"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ data, token }) => ({
        url: "createCategory",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["categoryApi"],
    }),
    deleteCategory: builder.mutation({
      query: ({ categoryId, token }) => ({
        url: `category/${categoryId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["categoryApi"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, data, token }) => ({
        url: `category/${categoryId}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["categoryApi"],
    }),
    getCategory: builder.query({
      query: () => `showAllCategories`,
      providesTags: ["categoryApi"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryAPI;
