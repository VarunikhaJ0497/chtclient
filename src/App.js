import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* If user is logged in, go to Chat, else go to Login */}
        <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;

        
        