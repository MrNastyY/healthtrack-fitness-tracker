import React from "react";
import { FaHome, FaDumbbell, FaClock, FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Activities", icon: <FaDumbbell />, path: "/activities" },
    { name: "Progress", icon: <FaClock />, path: "/progress" },
    { name: "Schedule", icon: <FaCalendarAlt />, path: "/schedule" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white w-64 p-6 flex flex-col justify-between shadow-xl">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-10">HealthTrack 💪</h1>

        {/* Menu */}
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 hover:bg-blue-600 ${
                active === item.name ? "bg-blue-600" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-xl transition duration-200 shadow-md"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
