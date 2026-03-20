import { useState } from "react";

export default function InputBox({ sendMessage, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex bg-gray-800 rounded-xl overflow-hidden">
      <input
        className="flex-1 p-3 bg-transparent outline-none placeholder-gray-500"
        placeholder="Ask about the medical document..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        className="bg-blue-600 px-6 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSend}
        disabled={disabled || !input.trim()}
      >
        {disabled ? "..." : "Send"}
      </button>
    </div>
  );
}