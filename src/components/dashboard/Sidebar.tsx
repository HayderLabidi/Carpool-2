import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Car,
  User,
  MapPin,
  Clock,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  userRole?: "driver" | "passenger";
  userName?: string;
  userAvatar?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  userRole = "driver",
  userName = "John Doe",
  userAvatar = "",
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: `/dashboard/${userRole}`,
    },
    ...(userRole === "driver"
      ? [
          {
            icon: <Car size={20} />,
            label: "My Rides",
            path: "/dashboard/driver/rides",
          },
          {
            icon: <User size={20} />,
            label: "Ride Requests",
            path: "/dashboard/driver/requests",
          },
        ]
      : [
          {
            icon: <MapPin size={20} />,
            label: "Find Rides",
            path: "/dashboard/passenger/find",
          },
          {
            icon: <Clock size={20} />,
            label: "Ride History",
            path: "/dashboard/passenger/history",
          },
        ]),
    {
      icon: <MessageSquare size={20} />,
      label: "Messages",
      path: "/messages",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "h-full bg-background border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <Car size={20} />
            </div>
            <span className="font-bold text-lg">RideShare</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto bg-primary text-primary-foreground p-1 rounded">
            <Car size={20} />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className={isCollapsed ? "mx-auto" : ""}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <TooltipProvider>
            {navItems.map((item, index) => (
              <Tooltip key={index} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <div className={isCollapsed ? "mx-auto" : ""}>
                      {item.icon}
                    </div>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      <div className="p-4 border-t">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md",
                  isCollapsed ? "justify-center" : "justify-between",
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{userName}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {userRole}
                      </span>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut size={18} />
                  </Button>
                )}
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="flex flex-col gap-1">
                <span className="font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
