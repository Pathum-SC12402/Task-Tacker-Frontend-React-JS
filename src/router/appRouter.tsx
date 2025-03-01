import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/components/auth/index";
import Layout from "@/components/layout/index";
import NotFoundPage from "@/pages/auth/notFoundPage";
import DashboardPage from "@/pages/dashboard/dashboardPage";

import AddPlansPage from "@/pages/pages/addPlanPage";
import TodayPlanPage from "@/pages/pages/todayPlanPage";
import PastPlanPage from "@/pages/pages/pastPlanPage";
import FuturePlanPage from "@/pages/pages/futurePlanPage";
import StartPage from "@/pages/home/startPage";
import ContactUsPage from "@/pages/pages/contactUsPage";

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
          <Route path="Contact_Us" element={<ContactUsPage/>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
