import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const ChatWindow = forwardRef(({ token }, ref) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useImperativeHandle(ref, () => ({
    clearChat: () => setMessages([])
  }));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (query) => {
    if (loading) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: query },
      { type: "bot", text: "Thinking...", loading: true }
    ]);
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/chat`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: "bot",
          text: res.data.answer,
          sources: res.data.sources
        };
        return updated;
      });
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = err.response?.status === 401
        ? "Session expired. Please login again."
        : "Failed to get response. Please try again.";

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: "bot",
          text: errorMsg,
          error: true
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-4">+</div>
            <h2 className="text-xl font-semibold mb-2">Welcome to MedAI</h2>
            <p className="text-sm">Upload a medical PDF and start asking questions</p>
          </div>
        ) : (
          messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)
        )}
        <div ref={chatEndRef}></div>
      </div>

      <InputBox sendMessage={sendMessage} disabled={loading} />
    </div>
  );
});

ChatWindow.displayName = "ChatWindow";

export default ChatWindow;