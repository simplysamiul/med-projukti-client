import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaHospitalUser } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate empty fields
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    // Hardcoded login
    if (email === "admin" && password === "admin123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linnear-to-br from-blue-600 to-blue-400 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm md:max-w-md">
        
        <div className="flex flex-col items-center mb-6">
          <FaHospitalUser className="text-blue-600 text-5xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-700">
            Hospital Management System
          </h1>
          <p className="text-gray-500 text-sm">Admin Login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Hint */}
        <p className="text-gray-500 text-xs text-center mt-4">
          Demo Credentials: <span className="font-medium">admin / admin123</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
