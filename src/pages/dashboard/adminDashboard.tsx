import { useState } from "react";
import { DashboardLineChart } from "@/components/parts/lineGraph";
import { UserListTable } from "@/components/parts/adminTable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { SuccessPopup } from "@/components/shared/SuccessPopup";
import { UserAccount } from "@/components/parts/userAccount";


export default function AdminDashboard() {
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRefresh = () => {
        setIsAccountOpen(false);
        navigate(0);
        setShowSuccess(true);
      };

    return (
        <div className="flex flex-col w-full h-screen p-4 space-y-4 overflow-auto">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button className="ml-auto border px-4 py-2 rounded-md border-gray-400 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setIsAccountOpen(true)}>
                Account
            </button>
            <div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 h-full">
                    <div className="w-full">
                        <DashboardLineChart />
                    </div>
                </div>
            </div>
    
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <UserListTable />
                </div>
            </div>
            <Dialog open={isAccountOpen} onOpenChange={setIsAccountOpen}>
                <DialogContent className="max-w-md">
                <UserAccount onSubmit={handleRefresh}/>
                </DialogContent>
            </Dialog>
            {showSuccess && (
                <SuccessPopup
                    message="User details updated successfully!"
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </div>      
    );            
} 