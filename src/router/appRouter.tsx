import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/components/auth/index";
import Layout from "@/components/layout/index";
import NotFoundPage from "@/pages/auth/notFoundPage";
import DashboardPage from "@/pages/dashboard/dashboardPage";

import AddPlansPage from "@/pages/plans/addPlanPage";
import TodayPlanPage from "@/pages/plans/todayPlanPage";
import PastPlanPage from "@/pages/plans/pastPlanPage";
import FuturePlanPage from "@/pages/plans/futurePlanPage";
import StartPage from "@/pages/home/startPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/*" element={<Page />} />
        <Route path="/Dashboard/" element={<Layout />} >
          <Route path="" element={<DashboardPage />} />
          <Route path="Add_Plans" element={<AddPlansPage/>} />
          <Route path="Plans/Today_Plans" element={<TodayPlanPage/>} />
          <Route path="Plans/Past_Plans" element={<PastPlanPage/>} />
          <Route path="Plans/Future_Plans" element={<FuturePlanPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
