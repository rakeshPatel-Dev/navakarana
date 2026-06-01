import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";


export  const Sidebar = ({user, navItems, handleLogout}) => (
    <aside className="w-64 min-h-screen bg-white border-r border-stone-100 flex flex-col">
      {/* Logo */}
      <Link title="Go to home" to="/" >
      <div className="px-6 py-5 border-b border-stone-100 flex items-center gap-2.5">
        <img src="/navakarana_logo.png" alt="Navakarana Logo" className="w-8 h-8" />
        <span className="font-bold text-stone-900">Navakarana</span>
      </div>
      </Link>

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