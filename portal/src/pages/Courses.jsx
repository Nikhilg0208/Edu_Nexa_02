import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import CourseTable from "../components/course/CourseTable.jsx";
import { useGetCategoryQuery } from "../redux/api/categoryAPI";
import { useGetCoursesQuery } from "../redux/api/courseAPI";
import Loader from "../components/common/Loader.jsx";

const Courses = () => {
  const { isLoading, isError, data } = useGetCategoryQuery();
  const { token } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("ALL"); // for user typing.
  const [selectedCategory, setSelectedCategory] = useState("ALL"); //call for api.
  const [filteredCategories, setFilteredCategories] = useState([]); //for dropdown.
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter categories with courses
  const allCategories = data?.data || [];
  const categoryList = useMemo(() => {
    return [
      { name: "ALL", _id: "all" },
      ...allCategories.filter((cat) => cat.courses?.length > 0),
    ];
  }, [data]);

  // Fetch courses when selectedCategory changes
  const {
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
    data: courseData,
  } = useGetCoursesQuery({ categoryName: selectedCategory, token });

  const courses = courseData?.data || [];

  useEffect(() => {
    if (query.trim().length > 0) {
      setFilteredCategories(
        categoryList.filter((cat) =>
          cat.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(categoryList);
    }
  }, [query, categoryList]);

  const handleSelect = (category) => {
    if (selectedCategory !== category.name) {
      setQuery(category.name);
      setSelectedCategory(category.name);
    }
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isErrorCourses) {
    return (
      <div className="text-center p-4 text-red-500">Error loading courses.</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading categories.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="relative w-full p-6 h-screen overflow-x-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Courses List
        </h1>

        <div
          className="mt-4 h-10 flex gap-4 justify-end relative"
          ref={dropdownRef}
        >
          <div className="relative w-60">
            <input
              type="text"
              className="bg-blue-100 h-9 w-full rounded-md px-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Category"
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && (
              <ul
                className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-scroll"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {isLoading ? (
                  <li className="px-3 py-2 text-gray-500">Loading...</li>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <li
                      key={item._id}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-200"
                      onClick={() => handleSelect(item)}
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Courses List */}
        {isLoadingCourses ? (
          <Loader />
        ) : courses?.length > 0 ? (
          <div className="max-h-3/4 overflow-y-auto">
            <CourseTable courses={courses} />
          </div>
        ) : (
          <p className="text-center text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
