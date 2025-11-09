import React from "react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-blue-600">HealthTrack</h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer">Add Activity</li>
          <li className="hover:text-blue-600 cursor-pointer">Profile</li>
        </ul>

        {/* Logout Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
