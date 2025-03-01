import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/dashboard/`,
  }),
  tagTypes: ["dashboardApi"],
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: ({ token }) => ({
        url: "",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["dashboardApi"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
