import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "../../api/registerUser";
import toast from "react-hot-toast";
import { registerUser } from "../../api/register-User";

const Register = () => {
 const navigate = useNavigate();

  // ✅ Initialize form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // ✅ State for error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Handle input field changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔹 Prevent page reload
    setError("");        // 🔹 Clear old error
    setSuccess("");      // 🔹 Clear old success

    try {
      // ✅ Call helper to register user via API
      const newUser = await registerUser(formData);

      // ✅ Save user data and login flag in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("loggedIn", "true");

      // ✅ Show success and redirect to login
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);
      toast.success("Registration successful!");
    } catch (err) {
      // ❌ Catch and display error message
      setError(err.message || "Something went wrong. Please try again.");
      console.log(err);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border borde r-gray-300 rounded shadow-sm focus:outline -none focus :ring focus:ri ng-blue-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border borde r-gray-300 rounded shadow-sm focus:outline -none focus :ring focus:ri ng-blue-200"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option disabled>Select Role</option>
                      <option value="Front-end Developer">Front-end Developer</option>
          <option value="Back-end Developer">Back-end Developer</option>
          <option value="Full-stack Developer">Full-stack Developer</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border borde r-gray-300 rounded shadow-sm focus:outline -none focus :ring focus:ri ng-blue-200"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
