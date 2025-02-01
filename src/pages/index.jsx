import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import TodayPlans from "./TodayPlans";
import PastPlans from "./PastPlans";
import FuturePlans from "./futurePlans";
import Layout from "./Layout";
import SubtaskModal from "./subtaskPage";
import "../assets/styles/index.css";

const Content = () => {
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  return (
    <Layout>
      <Routes>

        <Route path="/dashboard" element={<DashboardPage userId={userId} />} />
        <Route path="/today-plans" element={<TodayPlans userId={userId} />} />
        <Route path="/past-plans" element={<PastPlans userId={userId} />} />
        <Route path="/future-plans" element={<FuturePlans userId={userId} />} />
        <Route path="/subtasks/:taskId" element={<SubtaskModal />} />
      </Routes>
    </Layout>
  );
};

export default Content;
