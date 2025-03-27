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
  const userId = localStorage.getItem("userId");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/*" element={<Page />} />
        <Route path="/Dashboard/" element={<Layout />} >
          <Route path="" element={<DashboardPage userId={userId}/>} />
          <Route path="Add_Plans" element={<AddPlansPage userId={userId}/>} />
          <Route path="Plans/Today_Plans" element={<TodayPlanPage userId={userId}/>} />
          <Route path="Plans/Past_Plans" element={<PastPlanPage userId={userId}/>} />
          <Route path="Plans/Future_Plans" element={<FuturePlanPage userId={userId}/>} />
          <Route path="Contact_Us" element={<ContactUsPage/>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
