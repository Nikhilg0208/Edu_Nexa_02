import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/auth/`,
  }),
  // tagTypes: ["auth"], set chache data
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["auth"],// for remove chache
    }),
  }),
});

export const { useSignInMutation } = authAPI;
