import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}
export default App;
