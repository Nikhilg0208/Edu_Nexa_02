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
      className={`h-screen flex flex-col bg-gray-900 text-white ${
        isCollapsed ? "min-w-14" : "min-w-58 max-w-58"
      } transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button onClick={toggleSidebar} className="text-white p-2">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Header */}
      <h2 className="text-3xl font-bold text-center mb-8 border-b border-gray-700 pb-4">
        {isCollapsed ? <p>A</p> : <p>Admin Panel</p>}
      </h2>

      {/* Sidebar Menu (Takes up Remaining Space) */}
      <div className="flex flex-col space-y-2 flex-grow">
        <Link
          to="/admin/dashboard/users"
          onClick={() => handleSetActive("/admin/dashboard/users")}
        >
          <div
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/users"
                ? "bg-blue-400"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaUser className="text-blue-400 text-2xl" />
            {!isCollapsed && <h3 className="text-xl font-semibold">Users</h3>}
          </div>
        </Link>

        <Link
          to="/admin/dashboard/categories"
          onClick={() => handleSetActive("/admin/dashboard/categories")}
        >
          <div
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/categories"
                ? "bg-green-400"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <TbCategoryFilled className="text-green-400 text-2xl" />
            {!isCollapsed && (
              <h3 className="text-xl font-semibold">Categories</h3>
            )}
          </div>
        </Link>

        <Link
          to="/admin/dashboard/courses"
          onClick={() => handleSetActive("/admin/dashboard/courses")}
        >
          <div
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeSection === "/admin/dashboard/courses"
                ? "bg-yellow-400"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <FaDiscourse className="text-yellow-400 text-2xl" />
            {!isCollapsed && <h3 className="text-xl font-semibold">Courses</h3>}
          </div>
        </Link>
      </div>

      {/* Logout Button (Always at the Bottom) */}
      <button onClick={handleLogout} className="w-full text-left mt-auto">
        <div className="flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 bg-gray-800 hover:bg-gray-700">
          <FiLogOut className="text-red-400 text-2xl" />
          {!isCollapsed && <h3 className="text-xl font-semibold">Log Out</h3>}
        </div>
      </button>
    </div>
  );
};

export default AdminSidebar;
