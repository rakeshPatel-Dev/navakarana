import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  RiLiveLine, RiDashboardLine, RiGroupLine,
  RiVideoLine, RiSettings3Line, RiLogoutBoxLine,
  RiRulerLine, RiUserLine,
} from "react-icons/ri";

const navItems = [
  { to: "/admin/dashboard", icon: RiDashboardLine, label: "Dashboard" },
  { to: "/admin/teachers", icon: RiUserLine, label: "Teachers", adminOnly: true },
  { to: "/admin/users", icon: RiGroupLine, label: "Users", adminOnly: true },
  { to: "/admin/streams", icon: RiVideoLine, label: "Streams", adminOnly: true },
  { to: "/admin/settings", icon: RiSettings3Line, label: "Settings", adminOnly: true },
  { to: "/mat/dashboard", icon: RiRulerLine, label: "Mat Dashboard" },
];

export default function AdminLayout() {
  const { admin, adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate("/admin/login");
  }

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || admin?.role === "admin"
  );

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="w-64 min-h-screen bg-stone-900 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 flex items-center gap-2.5 border-b border-stone-700">
          <span className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center">
            <RiLiveLine size={16} />
          </span>
          <span className="font-bold text-white">Admin Panel</span>
        </div>

        {/* Role badge */}
        <div className="px-6 py-4 border-b border-stone-700/50">
          <p className="text-xs text-stone-400 mb-0.5">Signed in as</p>
          <p className="text-sm font-semibold text-white truncate">{admin?.name}</p>
          <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wide">{admin?.role}</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {visibleItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand/20 text-red-300"
                    : "text-stone-400 hover:bg-stone-700/50 hover:text-white"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-stone-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-medium text-stone-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
          >
            <RiLogoutBoxLine size={17} />
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
