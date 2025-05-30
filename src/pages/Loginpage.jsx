import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/google.png";
import RocketCharacter from "../assets/rocket.png";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Get dispatch from AuthContext

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Simulasi bypass login (hapus semua validasi dan API call)
    setTimeout(() => {
      const user = { email: form.email }; // Simulasi data user
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch login action ke AuthContext
      dispatch({ type: 'LOGIN', payload: user });

      navigate("/dashboard"); // Arahkan ke halaman dashboard setelah login
      setLoading(false);
    }, 1000); // delay sedikit biar user merasa ada proses
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex h-screen w-full bg-white"
    >
      {/* Kiri */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#1e88e5] relative">
        <h1 className="absolute top-10 left-10 text-white text-3xl font-bold">
          Sign In to
        </h1>
        <p className="absolute top-20 left-10 text-white text-lg">
          CV Builder is simply!
        </p>
        <img
          src={RocketCharacter}
          alt="Rocket Character"
          className="w-[400px] h-auto"
        />
      </div>

      {/* Kanan */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 sm:px-16"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                Welcome to <span className="text-[#1e88e5] font-bold">LOREM</span>
              </p>
              <h2 className="text-3xl font-bold mt-2">Sign in</h2>
            </div>
            <div className="text-sm text-gray-500">
              <p>
                No Account?{" "}
                <a href="/signup" className="text-[#1e88e5] hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 mb-6 border rounded-lg bg-[#f5f8ff] hover:bg-[#ebefff] transition"
          >
            <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enter your email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
              <div className="text-right mt-1">
                <a href="/forgot-password" className="text-sm text-[#1e88e5] hover:underline">
                  Forgot Password
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white font-semibold py-2 rounded-lg shadow-md transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
