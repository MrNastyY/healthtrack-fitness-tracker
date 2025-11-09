import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaLock } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("https://healthtrack-fitness-tracker.onrender.com/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 text-gray-800">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Create Account 🧘‍♂️
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}
        {message && (
          <p className="text-green-600 text-center mb-4 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <FaUserPlus className="text-gray-500 mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-gray-700"
              required
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200 shadow-md font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
