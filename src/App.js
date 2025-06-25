import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import GuguPage from "./pages/GuguPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gugu" element={<GuguPage />} />
      </Routes>
    </Router>
  );
}

export default App;