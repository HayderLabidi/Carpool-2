import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { cn } from "../../lib/utils";

interface DashboardLayoutProps {
  children?: ReactNode;
  userRole?: "driver" | "passenger";
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout = ({
  children,
  userRole = "driver",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      <main
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 bg-background",
          sidebarCollapsed ? "ml-[70px]" : "ml-[250px]",
        )}
      >
        <div className="h-16 border-b sticky top-0 bg-background z-10 px-6 flex items-center">
          <h1 className="text-xl font-semibold">
            {userRole === "driver" ? "Driver Dashboard" : "Passenger Dashboard"}
          </h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
