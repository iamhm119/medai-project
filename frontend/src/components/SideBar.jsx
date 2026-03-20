import { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function Sidebar({ role, onNewChat, onLogout }) {
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".pdf")) {
      setUploadMessage("Only PDF files allowed");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadMessage(`Uploaded! ${res.data.chunks} chunks processed`);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadMessage("Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    if (onLogout) onLogout();
  };

  return (
    <div className="w-64 bg-[#020617] p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">+</span>
          </div>
          <h1 className="text-xl font-bold">MedAI</h1>
        </div>

        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 p-2 rounded mb-4 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>+</span> New Chat
        </button>

        <div className="text-xs text-gray-500 mb-2">
          Role: <span className="text-blue-400 capitalize">{role}</span>
        </div>
      </div>

      <div className="space-y-4">
        {role === "admin" && (
          <div className="bg-gray-800/50 p-3 rounded">
            <label className="block text-sm font-medium mb-2">
              Upload Medical PDF
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
            />
            {uploading && (
              <p className="text-xs text-blue-400 mt-2">Processing...</p>
            )}
            {uploadMessage && (
              <p className={`text-xs mt-2 ${uploadMessage.includes("fail") ? "text-red-400" : "text-green-400"}`}>
                {uploadMessage}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600/20 text-red-400 p-2 rounded hover:bg-red-600/30 transition-colors text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}