import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function Login({ setToken, setRole }) {
  const [username, setUsername] = useState("");
  const [role, setRoleLocal] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/login`, null, {
        params: { username: username.trim(), role }
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setToken(token);
      setRole(role);

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-8 rounded-xl w-96 shadow-lg">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">MedAI</h1>
          <p className="text-gray-400 text-sm mt-1">Medical AI Assistant</p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full mb-4 p-3 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <select
          className="w-full mb-4 p-3 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          value={role}
          onChange={(e) => setRoleLocal(e.target.value)}
          disabled={loading}
        >
          <option value="user">Patient / User</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}