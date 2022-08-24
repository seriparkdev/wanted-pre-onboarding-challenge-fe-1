import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}
export default App;
