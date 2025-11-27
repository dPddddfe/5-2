import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowList from "./components/Pages/ShowList";
import AddPage from "./components/Pages/AddPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
