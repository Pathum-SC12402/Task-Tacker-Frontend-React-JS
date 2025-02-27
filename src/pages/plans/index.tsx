import { Route, Routes } from "react-router-dom";
import  AddPlansPage  from "./pages/addPlanPage"
import  TodayPlansPage  from "./pages/todayPlanPage"
import  PastPlansPage  from "./pages/pastPlanPage"
import  FuturePlansPage  from "./pages/futurePlanPage"

export default function Page() {
  return (
    <Routes>
        <Route path="Add_Plans" element={<AddPlansPage />} />
        <Route path="Today_Plans" element={<TodayPlansPage />} />
        <Route path="Past_Plans" element={<PastPlansPage />} />
        <Route path="Future_Plans" element={<FuturePlansPage />} />
    </Routes>
  )
}
