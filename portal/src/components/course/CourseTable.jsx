import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { CourseTableHeading } from "../../data/TableColumns";
import { useDeleteCourseMutation } from "../../redux/api/courseAPI";
import ConfirmationModal from "../common/ConfirmationModal";
import SectionTable from "./SectionTable";
import { useSelector } from "react-redux";

const CourseTable = ({ courses }) => {
  const [expandedCourseRows, setExpandedCourseRows] = useState({});
  const [deleteCourse] = useDeleteCourseMutation();
  const [modal, setModal] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const toggleCourseRow = (courseId) => {
    setExpandedCourseRows((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const deleteHandler = async (id) => {
    setCourseId(id);
    setModal(true);
  };

  const { token } = useSelector((state) => state.auth);

  const confirmDeleteHandler = async () => {
    try {
      const res = await deleteCourse({ courseId, token }).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting course");
    } finally {
      setModal(false);
      setCourseId(null);
    }
  };

  return (
    <div className="mt-6">
      <div className={`${modal ? "blur-sm" : ""}`}>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg select-none">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {CourseTableHeading.map((item, index) => (
                <th
                  key={index}
                  className="px-5 py-3 border-b text-left font-bold"
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
                      <span>{course.courseName}</span>
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
                      onClick={() => deleteHandler(course._id)}
                    />
                  </td>
                </tr>

                {/* Expandable Section */}
                {expandedCourseRows[course._id] && (
                  <tr>
                    <td
                      colSpan={CourseTableHeading.length}
                      className="bg-gray-100"
                    >
                      <SectionTable
                        colSpan={CourseTableHeading.length}
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
      <ConfirmationModal
        isOpen={modal}
        onClose={() => setModal(false)}
        onConfirm={confirmDeleteHandler}
        message="Are you sure? This will delete this Course."
      />
    </div>
  );
};

export default CourseTable;
