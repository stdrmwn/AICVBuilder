import { motion } from "framer-motion";
import React, { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost/WEBSITEHIMPUNAN/backendadmin/dist/pages/login/login_process.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = "http://localhost/WEBSITEHIMPUNAN/backendadmin/dist/pages/dashboard/index.php";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-[#edf0fa] flex flex-col justify-center items-center px-8 sm:px-12"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: "#800040" }}>
            HIMSI PRADITA
          </h1>
          <h2 className="text-2xl font-semibold mt-2 text-gray-700">Selamat Datang</h2>
          <p className="text-sm text-gray-500 mt-1">Masuk sebagai Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6a0840] to-[#1e1e96] text-white py-2 rounded-xl font-semibold shadow-lg hover:opacity-90 transition duration-200"
          >
            Sign In
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block w-1/2 bg-gradient-to-b from-[#6a0840] to-[#1e1e96] relative"
      >
        <div className="absolute inset-0 bg-[url('/wave-background.svg')] bg-cover bg-center opacity-20" />
      </motion.div>
    </div>
  );
};

export default LoginPage;
