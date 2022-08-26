import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./components/auth/RequireAuth";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
export default App;
