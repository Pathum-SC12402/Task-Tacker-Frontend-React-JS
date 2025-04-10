import { DashboardLineChart } from "@/components/parts/lineGraph";
import { TableDemo } from "@/components/parts/adminTable";

export default function AdminDashboard() {
    return (
        <div className="flex flex-col w-full h-screen p-4 space-y-4 overflow-auto">
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 h-full">
                    <div className="w-full">
                        <DashboardLineChart />
                    </div>
                </div>
            </div>
    
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <TableDemo />
                </div>
            </div>
        </div>
    );            
} 