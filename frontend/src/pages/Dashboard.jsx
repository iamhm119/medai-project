import { useRef } from "react";
import Sidebar from "../components/Sidebar";
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