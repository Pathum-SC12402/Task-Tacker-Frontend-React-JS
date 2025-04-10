import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../components/shared/spinner"; // The spinner component you created

// Lazy load the components
const Page = lazy(() => import("@/components/auth/index"));
const Layout = lazy(() => import("@/components/layout/index"));
const NotFoundPage = lazy(() => import("@/pages/auth/notFoundPage"));
const AdminDashboard = lazy(() => import("@/pages/dashboard/adminDashboard"));
const DashboardPage = lazy(() => import("@/pages/dashboard/dashboardPage"));
const AddPlansPage = lazy(() => import("@/pages/pages/addPlanPage"));
const TodayPlanPage = lazy(() => import("@/pages/pages/todayPlanPage"));
const PastPlanPage = lazy(() => import("@/pages/pages/pastPlanPage"));
const FuturePlanPage = lazy(() => import("@/pages/pages/futurePlanPage"));
const StartPage = lazy(() => import("@/pages/home/startPage"));
const ContactUsPage = lazy(() => import("@/pages/pages/contactUsPage"));
const SubTaskPage = lazy(() => import("@/pages/pages/subTaskPage"));

export default function AppRouter() {
  const userId = localStorage.getItem("userId");

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<StartPage />} />
          <Route path="/*" element={<Page />} />

          <Route path="/Admin_Dashboard" element={<AdminDashboard />} />
          <Route path="/Dashboard/" element={<Layout />}>
            <Route index element={<DashboardPage userId={userId} />} />
            <Route path="Add_Plans" element={<AddPlansPage userId={userId} />} />
            <Route path="tasks" element={<SubTaskPage />} />
            <Route path="Today_Plans" element={<TodayPlanPage userId={userId} />} />
            <Route path="Past_Plans" element={<PastPlanPage userId={userId} />} />
            <Route path="Future_Plans" element={<FuturePlanPage userId={userId} />} />
            <Route path="Contact_Us" element={<ContactUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Global 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
