import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "../pages/index";
import StartPage from "../pages/StartPage";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<StartPage/>} />
        <Route path="/content/*" element={<Content />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
