import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  RiGroupLine, RiUserStarLine, RiVideoLine, RiMoneyDollarCircleLine, 
  RiSettings4Line, RiArrowRightUpLine, RiHistoryLine 
} from "react-icons/ri";

const MOCK_ACTIVITIES = [
  { id: 1, text: "New yoga stream created by Arjun Mehta", time: "10 minutes ago" },
  { id: 2, text: "Student Jane Doe registered an account", time: "42 minutes ago" },
  { id: 3, text: "Custom Yoga Mat order completed for CS Session #89", time: "2 hours ago" },
  { id: 4, text: "Teacher Sarah Connor uploaded a recording price", time: "4 hours ago" },
  { id: 5, text: "Platform registration fee modified to $49", time: "1 day ago" }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900">Platform Overview</h1>
          <p className="text-stone-500 text-xs mt-1">Review active system statistics, revenue metrics, and background jobs.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Students", value: "1,245", icon: <RiGroupLine className="text-blue-600" />, bg: "bg-blue-50" },
          { label: "Total Instructors", value: "32", icon: <RiUserStarLine className="text-purple-600" />, bg: "bg-purple-50" },
          { label: "Total Transmissions", value: "184", icon: <RiVideoLine className="text-amber-600" />, bg: "bg-amber-50" },
          { label: "System Revenue", value: "$4,850.00", icon: <RiMoneyDollarCircleLine className="text-emerald-600" />, bg: "bg-emerald-50" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-stone-100 p-5 rounded-3xl shadow-sm flex items-center gap-4">
            <div className={`size-11 ${stat.bg} rounded-2xl flex items-center justify-center border border-stone-200/20 shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-xl font-black text-stone-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Logs (66%) */}
        <div className="lg:col-span-2 bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <RiHistoryLine className="text-stone-500 size-4" />
            <h2 className="font-extrabold text-stone-900 text-sm uppercase tracking-wider">Recent Activity</h2>
          </div>

          <div className="divide-y divide-stone-100">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <p className="text-stone-750 text-xs font-medium leading-normal">{activity.text}</p>
                <span className="text-[9px] text-stone-400 font-semibold shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links (33%) */}
        <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-4 h-fit">
          <h3 className="font-extrabold text-stone-900 text-sm uppercase tracking-wider border-b border-stone-100 pb-3">
            Admin Directory
          </h3>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {[
              { to: "/admin/teachers", label: "Manage Teachers" },
              { to: "/admin/users", label: "Manage Students" },
              { to: "/admin/streams", label: "Manage Streams" },
              { to: "/admin/settings", label: "System Settings" },
              { to: "/mat/dashboard", label: "Custom Mat Dashboard" }
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="flex items-center justify-between px-4 py-2.5 bg-stone-50 hover:bg-stone-100/80 border border-stone-100 rounded-xl transition-all font-semibold text-stone-700 text-xs hover:text-stone-900"
              >
                <span>{link.label}</span>
                <RiArrowRightUpLine className="text-stone-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
