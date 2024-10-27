import React, { useEffect, useState } from "react";
import { Package, Truck, LifeBuoy, CalendarArrowDown, UsersRound, ReceiptIndianRupee, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/zustand/store";

// Enhanced Clock Component
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-800/80 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50 shadow-lg">
      <div className="flex flex-col items-center justify-center space-y-1">
        <div className="text-2xl font-bold text-gray-100">
          {time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
          })}
        </div>
        <div className="text-xs text-gray-400">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, text, active = false }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-102",
        active 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
          : "text-gray-400 hover:bg-gray-700/60 hover:text-white"
      )}
    >
      {icon}
      <span className="text-lg font-medium">{text}</span>
    </Link>
  );
};

const SidebarContent = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const param = window.location.pathname;
  const [isAdmin, setisAdmin] = useState(false);
  const highlight = param.split("/").pop();
  const role = useAuthStore((state) => state?.user?.role);
  
  useEffect(() => {
    if (role === "admin") {
      setisAdmin(true);
    }
  }, [role]);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
          TMS Admin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {isAdmin && (
          <NavItem
            to="/"
            icon={<Package className="h-6 w-6" />}
            text="Dashboard"
            active={highlight === ""}
          />
        )}
        <NavItem
          to="/truck-info"
          icon={<Truck className="h-6 w-6" />}
          text="Truck Info"
          active={highlight === "truck-info"}
        />
        <NavItem
          to="/ship"
          icon={<CalendarArrowDown className="h-6 w-6" />}
          text="Shipment"
          active={highlight === "ship"}
        />
        <NavItem
          to="/driver"
          icon={<LifeBuoy className="h-6 w-6" />}
          text="Driver"
          active={highlight === "driver"}
        />
        <NavItem
          to="/client"
          icon={<UsersRound className="h-6 w-6" />}
          text="Client"
          active={highlight === "client"}
        />
        <NavItem
          to="/billing"
          icon={<ReceiptIndianRupee className="h-6 w-6" />}
          text="Billing"
          active={highlight === "billing"}
        />
        {isAdmin && (
          <NavItem
            to="/signup"
            icon={<ReceiptIndianRupee className="h-6 w-6" />}
            text="Signup"
            active={highlight === "signup"}
          />
        )}
      </nav>

      {/* Footer Section */}
      <div className="mt-auto pt-6 space-y-4">
        <Clock />
        
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full p-3 text-lg font-medium text-gray-400 bg-gray-800/50 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-102 mb-2"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Signout
        </button>
      </div>
    </div>
  );
};

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Fixed Sidebar for larger screens */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-6 transition-all duration-300 ease-in-out shadow-lg overflow-y-auto scrollbar-hide">
        <SidebarContent isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </aside>

      {/* Sidebar for mobile */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white p-6 h-full overflow-y-auto">
          <SidebarContent isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </SheetContent>
      </Sheet>

      {/* Main content padding to account for fixed sidebar */}
      <div className="lg:pl-64" />
    </>
  );
};

export default Sidebar;