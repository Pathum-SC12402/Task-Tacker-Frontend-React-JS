import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "@/components/auth/index";
import Layout from "@/components/layout/index";
import NotFoundPage from "@/pages/auth/notFoundPage";
import DashboardPage from "@/pages/dashboard/dashboardPage";
import PlansPage from "@/pages/plans/index";
import AddPlansPage from "@/pages/plans/pages/addPlanPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Page />} />
        <Route path="/Dashboard/" element={<Layout />} >
          <Route path="" element={<DashboardPage />} />
          <Route path="Add_Plans" element={<AddPlansPage/>} />
          <Route path="Plans/*" element={<PlansPage/>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
