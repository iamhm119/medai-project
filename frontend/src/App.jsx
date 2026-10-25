import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  const handleLogout = () => {
    setToken(null);
    setRole(null);
  };

  if (!token) {
    return <Login setToken={setToken} setRole={setRole} />;
  }

  return <Dashboard token={token} role={role} onLogout={handleLogout} />;
}

export default App;