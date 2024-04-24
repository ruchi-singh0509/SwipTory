import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Toast from "./Components/Toast";

function App() {

  return (
    <div>
      <BrowserRouter>
      <Toast />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="bookmark" element={<Bookmark />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
