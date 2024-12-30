import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CryptoDetail from "./components/CryptoDetail";
import News from "./components/News";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crypto/:id" element={<CryptoDetail />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
