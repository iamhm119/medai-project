import { useRef } from "react";
import Sidebar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";

export default function Dashboard({ token, role, onLogout }) {
  const chatRef = useRef(null);

  const handleNewChat = () => {
    if (chatRef.current) {
      chatRef.current.clearChat();
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      <Sidebar role={role} onNewChat={handleNewChat} onLogout={onLogout} />
      <ChatWindow ref={chatRef} token={token} />
    </div>
  );
}

// GROQ_API_KEY = [your_key_from_console.groq.com]
// SECRET_KEY = 2614bb9aa07c139f8d5352eb3175d238528656e03320a9a228029ce8136dd6c6
// ALGORITHM = HS256