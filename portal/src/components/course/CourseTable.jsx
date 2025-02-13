import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SectionTable from "./SectionTable";

const tableHeading = [
  "Course Name",
  "Instructor",
  "Category",
  "Total Duration",
  "Total Enrolled",
  "Rating (Avg/Total)",
  "Price",
  "Actions",
];

const CourseTable = ({ courses }) => {
  const [expandedCourseRows, setExpandedCourseRows] = useState({});

  const toggleCourseRow = (courseId) => {
    setExpandedCourseRows((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  return (
    <div className="mt-6">
      <div>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg select-none">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {tableHeading.map((item, index) => (
                <th
                  key={index}
                  className="px-5 py-3 border-b text-left font-semibold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <React.Fragment key={course._id}>
                {/* Course Row */}
                <tr
                  className={`transition hover:bg-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3 border-b">
                    <div className="flex items-center gap-x-3">
                      {expandedCourseRows[course._id] ? (
                        <FaAngleUp
                          onClick={() => toggleCourseRow(course._id)}
                          className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
                        />
                      ) : (
                        <FaAngleDown
                          onClick={() => toggleCourseRow(course._id)}
                          className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
                        />
                      )}
                      <span className="font-medium">{course.courseName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 border-b">{`${course.instructor.firstName} ${course.instructor.lastName}`}</td>
                  <td className="px-5 py-3 border-b">
                    {course?.category?.name}
                  </td>
                  <td className="px-5 py-3 border-b">
                    {course?.totalDuration}
                  </td>
                  <td className="px-5 py-3 border-b">
                    {course?.totalStudentsEnrolled}
                  </td>
                  <td className="px-5 py-3 border-b">
                    {course?.averageRating} ⭐ / {course?.totalReviewCount}{" "}
                    reviews
                  </td>
                  <td className="px-5 py-3 border-b font-semibold text-green-600">
                    {course.price}
                  </td>
                  <td className="px-5 py-3 border-b">
                    <MdDeleteForever
                      className="hover:text-red-500 cursor-pointer transition duration-200"
                      size={25}
                    />
                  </td>
                </tr>

                {/* Expandable Section */}
                {expandedCourseRows[course._id] && (
                  <tr>
                    <td colSpan={tableHeading.length} className="bg-gray-100">
                      <SectionTable
                        colSpan={tableHeading.length}
                        courseSection={course?.courseContent}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
