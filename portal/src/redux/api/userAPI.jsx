import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/user/`,
  }),
  tagTypes: ["userApi"],
  endpoints: (builder) => ({
    // deleteCategory: builder.mutation({
    //   query: ({ categoryId, token }) => ({
    //     url: `user/${categoryId}`,
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ["categoryApi"],
    // }),
    getUsers: builder.query({
      query: ({ token }) => ({
        url: "all-users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["userApi"],
    }),
  }),
});

export const { useGetUsersQuery } = userAPI;
