import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  RiLiveLine, RiDashboardLine, RiVideoLine,
  RiUserLine, RiLogoutBoxLine, RiMenuLine, RiCloseLine,
} from "react-icons/ri";
import { useState } from "react";

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

  const Sidebar = () => (
    <aside className="w-64 min-h-screen bg-white border-r border-stone-100 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-stone-100 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center">
          <RiLiveLine size={16} />
        </span>
        <span className="font-bold text-stone-900">Navakarana</span>
      </div>

      {/* Role badge */}
      <div className="px-6 py-4 border-b border-stone-50">
        <p className="text-xs text-stone-400 mb-0.5">Signed in as</p>
        <p className="text-sm font-semibold text-stone-900 truncate">{user?.name}</p>
        <span className="text-[10px] font-semibold text-brand uppercase tracking-wide">Teacher</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors ${isActive
                ? "bg-brand/10 text-brand"
                : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-stone-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-medium text-stone-500 hover:bg-red-50 hover:text-brand transition-colors"
        >
          <RiLogoutBoxLine size={17} />
          Log Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar />
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
