import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
    }
  }, []);

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