// import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/login-Api";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ call hook here, top-level of component

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    setError(""); // Reset error on each submit

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // 1. Fetch all registered users from Mock API
      const user = await loginUser(email, password);

      // 4. If match found, redirect to dashboard after 2 seconds
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        // ✅ Save login state to localStorage
        localStorage.setItem("loggedIn", "true");

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        // 5. If no match, show error message
        setError("Invalid email or password.");
      }
    } catch (err) {
      // 6. Catch any other error (network, etc.)
      setError("Something went wrong. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-3 py-2 border border-g ray-600 rounded shadow-sm focus:outline -none focus :ring focus: ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-3 py-2 border borde r-gray-300 rounded shadow-sm focus:outline -none focus :ring focus:ri ng-blue-200"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-c enter mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            i don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

//  const handleLogin = (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;
//   const storedEmail = localStorage.getItem("userEmail");
//   const storedPassword = localStorage.getItem("userPassword");
//   if (email === storedEmail && password === storedPassword) {
//     localStorage.setItem("loggedIn", "true");
//     setTimeout(() => {
//       Navigate("/dashboard");
//     }, 1000);
//   } else {
//     alert("Invalid email or password");
//   }
// };
