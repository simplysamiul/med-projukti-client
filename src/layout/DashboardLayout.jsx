import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHospitalUser,
  FaUserMd,
  FaStethoscope,
  FaSignOutAlt,
  FaHospital,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHospital /> },
    { name: "OPD", path: "/dashboard/opd", icon: <FaStethoscope /> },
    { name: "Department", path: "/dashboard/departments", icon: <FaUserMd /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      {/* Overlay (only for mobile when open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full md:h-auto w-64 bg-blue-700 text-white flex flex-col justify-between transition-all duration-300 ${
          isOpen
            ? "translate-x-0 md:translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="flex items-center justify-center gap-2 py-5 border-b border-blue-500">
            <FaHospitalUser className="text-3xl" />
            <h1 className="text-2xl font-bold">HMS</h1>
          </div>

          <nav className="flex flex-col mt-6 space-y-2 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-500">
          <button onClick={() => navigate("/login")} className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 transition">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <button
              className="text-blue-700 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Hospital Management System
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              H
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
