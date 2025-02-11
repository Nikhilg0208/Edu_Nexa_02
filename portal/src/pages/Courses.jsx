import React, { useState, useEffect, useRef, useMemo } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useGetCategoryQuery } from "../redux/api/categoryAPI";
import { useGetCoursesQuery } from "../redux/api/courseAPI";
import { useSelector } from "react-redux";

const Courses = () => {
  const { isLoading, isError, data } = useGetCategoryQuery();
  const { token } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Use useMemo to prevent unnecessary recalculations
  const allCategories = data?.data || [];
  const fewCategory = useMemo(() => {
    return allCategories.filter((cat) => cat.courses?.length > 0);
  }, [allCategories]);

  const {
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
    data: courseData,
  } = useGetCoursesQuery(
    { categoryName: selectedCategory, token },
    { skip: !selectedCategory }
  );

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = fewCategory.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(fewCategory);
    }
  }, [query, fewCategory]);

  const handleSelect = (selectedCategory) => {
    setQuery(selectedCategory.name);
    setSelectedCategory(selectedCategory.name);
    setShowDropdown(false);
  };

  const submitCategory = () => {
    if (query.trim().length > 0) {
      setSelectedCategory(query);
      setShowDropdown(false);
    }
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
    <div className="flex">
      <AdminSidebar />
      <div className="w-full p-6">
        <div
          className="mt-4 h-10 flex gap-4 justify-end relative"
          ref={dropdownRef}
        >
          {/* Input Field */}
          <div className="relative w-60">
            <input
              type="text"
              className="bg-blue-100 h-9 w-full rounded-md px-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Category"
              onFocus={() => setShowDropdown(true)}
            />
            {/* Dropdown */}
            {showDropdown && (
              <ul
                className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-scroll"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
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

          {/* Submit Button */}
          <button
            className="w-20 h-9 rounded-md text-white font-semibold bg-gray-900"
            onClick={submitCategory}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
