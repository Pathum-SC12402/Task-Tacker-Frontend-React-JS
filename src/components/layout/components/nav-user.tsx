import { useState } from "react";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserAccount } from "@/components/parts/userAccount";
import { useNavigate } from "react-router-dom";
import { SuccessPopup } from "@/components/shared/SuccessPopup";


export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("userId");
      sessionStorage.removeItem("userId");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
  const handleRefresh = () => {
    setIsAccountOpen(false);
    navigate(0);
    setShowSuccess(true);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-2"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0].toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Dialog>
                <DialogTrigger asChild>
                <DropdownMenuItem onSelect={() => setIsAccountOpen(true)}>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                </DialogTrigger>
              </Dialog>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
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
    </SidebarMenu>
  );
}
