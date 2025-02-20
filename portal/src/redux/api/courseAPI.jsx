import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseAPI = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/course/`,
  }),
  tagTypes: ["courseApi"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: ({ categoryName, token }) => ({
        url: `getAllFullCourseDetails?${
          (categoryName && `category=${categoryName}`) || ""
        }`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["courseApi"],
    }),
    deleteCourse: builder.mutation({
      query: ({ courseId, token }) => ({
        url: "deleteCourse",
        method: "DELETE",
        body: { courseId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["courseApi"],
    }),
  }),
});

export const { useGetCoursesQuery, useDeleteCourseMutation } = courseAPI;
