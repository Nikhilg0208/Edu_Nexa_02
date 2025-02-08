import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/user/`,
  }),
  tagTypes: ["userApi"],
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `${userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
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

export const { useGetUsersQuery, useDeleteUserMutation } = userAPI;
