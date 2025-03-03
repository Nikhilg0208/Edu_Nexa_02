import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDiscourse,
  FaUser,
} from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducer/authReducer";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const AdminSidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSetActive = (path) => {
    setActiveSection(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  return (
    <div
      className={`min-h-full flex flex-col bg-gray-900 text-white ${
        isCollapsed ? "min-w-12 max-w-12" : "min-w-46 max-w-46"
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
        className="text-2xl font-bold text-center mb-8 border-b border-gray-700 pb-4 cursor-pointer"
        onClick={() => navigate("/admin/dashboard")}
      >
        {isCollapsed ? "A" : "Admin Panel"}
      </h2>

      {/* Sidebar Menu (Takes up Remaining Space) */}
      <div className="flex flex-col space-y-2 flex-grow">
        <Link
          to="/admin/dashboard"
          onClick={() => handleSetActive("/admin/dashboard")}
        >
          <div
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <MdOutlineDashboardCustomize className="text-black text-balance" />
            {!isCollapsed && (
              <h3 className="text-balance font-semibold">Dashboard</h3>
            )}
          </div>
        </Link>

        <Link
          to="/admin/dashboard/users"
          onClick={() => handleSetActive("/admin/dashboard/users")}
        >
          <div
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/users"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaUser className="text-blue-400 text-balance" />
            {!isCollapsed && (
              <h3 className="text-balance font-semibold">Users</h3>
            )}
          </div>
        </Link>

        <Link
          to="/admin/dashboard/categories"
          onClick={() => handleSetActive("/admin/dashboard/categories")}
        >
          <div
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/categories"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <TbCategoryFilled className="text-green-400 text-balance" />
            {!isCollapsed && (
              <h3 className="text-balance font-semibold">Categories</h3>
            )}
          </div>
        </Link>

        <Link
          to="/admin/dashboard/courses"
          onClick={() => handleSetActive("/admin/dashboard/courses")}
        >
          <div
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/courses"
                ? "bg-gray-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaDiscourse className="text-yellow-400 text-balance" />
            {!isCollapsed && (
              <h3 className="text-balance font-semibold">Courses</h3>
            )}
          </div>
        </Link>
      </div>

      {/* Logout Button (Always at the Bottom) */}
      <button onClick={handleLogout} className="w-full text-left mt-auto">
        <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 bg-gray-800 hover:bg-gray-700">
          <FiLogOut className="text-red-400 text-balance" />
          {!isCollapsed && (
            <h3 className="text-balance font-semibold">Log Out</h3>
          )}
        </div>
      </button>
    </div>
  );
};

export default AdminSidebar;
