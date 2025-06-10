import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AuthenticatedRoute, UnAuthenticatedRoute } from "./Guards";
import { Login } from "./home/auth/login/Login";
import { Register } from "./home/auth/register/Register";
import { ChatHome } from "./home/chat/ChatHome";
import { setNavigate } from "./router";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <UnAuthenticatedRoute>
              <Login />
            </UnAuthenticatedRoute>
          }
        />
        {/* <Route
          path="/register"
          element={
            <UnAuthenticatedRoute>
              <Register />
            </UnAuthenticatedRoute>
          }
        /> */}
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <ChatHome />
            </AuthenticatedRoute>
          }
        />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
