import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTrophy,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

const AdminSidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSetActive = (path) => {
    setActiveSection(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button onClick={toggleSidebar} className="text-white p-2">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Header */}
      <h2
        className={`text-3xl font-bold text-center mb-8 border-b border-gray-700 pb-4 max-h-14 `}
      >
        {isCollapsed && <p>A</p>}
        <p className={isCollapsed ? "hidden" : ""}>Admin Panel</p>
      </h2>

      {/* Sidebar Menu */}
      <div className="flex-col flex space-y-2">
        {/* User Section */}
        <Link
          to="/admin/dashboard/user"
          onClick={() => handleSetActive("/admin/dashboard/user")}
        >
          <div
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/user"
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaUser className="text-blue-400 text-2xl" />
            {!isCollapsed && <h3 className="text-xl font-semibold">User</h3>}
          </div>
        </Link>

        {/*Course Categories*/}
        <Link
          to="/admin/dashboard/categories"
          onClick={() => handleSetActive("/admin/dashboard/categories")}
        >
          <div
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/categories"
                ? "bg-green-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <TbCategoryFilled className="text-green-400 text-2xl" />
            {!isCollapsed && (
              <h3 className="text-xl font-semibold">Categories</h3>
            )}
          </div>
        </Link>

        {/* Challenge Section */}
        <Link
          to="/admin/dashboard/challenge"
          onClick={() => handleSetActive("/admin/dashboard/challenge")}
        >
          <div
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/challenge"
                ? "bg-yellow-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaTrophy className="text-yellow-400 text-2xl" />
            {!isCollapsed && (
              <h3 className="text-xl font-semibold">Challenge</h3>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
