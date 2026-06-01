import {  Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
   RiDashboardLine, RiVideoLine,
  RiUserLine,  RiMenuLine, 
} from "react-icons/ri";
import { useState } from "react";
import { Sidebar } from "./components/TeacherSidebar";

const navItems = [
  { to: "/teacher/dashboard", icon: RiDashboardLine, label: "Dashboard" },
  { to: "/teacher/streams", icon: RiVideoLine, label: "My Classes" },
  { to: "/teacher/channel", icon: RiUserLine, label: "Channel" },
];

export default function TeacherLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

 

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar user={user} navItems={navItems} handleLogout={handleLogout} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar user={user} navItems={navItems} handleLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-stone-100">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl text-stone-600">
            <RiMenuLine size={20} />
          </button>
          <span className="font-bold text-stone-900 text-sm">Teacher Portal</span>
          <div className="w-8" />
        </div>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

