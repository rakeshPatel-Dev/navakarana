import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiVideoLine, RiCalendarEventLine, RiShoppingBag3Line,
  RiExternalLinkLine, RiBroadcastLine, RiPlayListAddLine, RiArrowRightUpLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_TEACHER_STREAMS = [
  {
    uuid: "live-stream-1",
    title: "Navakarana Yoga Vinyasa: Strength and Alignment",
    status: "live",
    date: "Started 1 hour ago",
    category: "Vinyasa"
  },
  {
    uuid: "scheduled-stream-1",
    title: "Hatha Flow for Flexibility & Relaxation",
    status: "scheduled",
    date: "Scheduled for June 2, 2026",
    category: "Hatha Flow"
  },
  {
    uuid: "ended-stream-1",
    title: "Yin Yoga: Deep Joint Opening & Mindfulness",
    status: "ended",
    date: "Completed on May 29, 2026",
    category: "Yin Yoga"
  }
];

export default function TeacherDashboardPage() {
  const navigate = useNavigate();
  const [streams] = useState(MOCK_TEACHER_STREAMS);

  // Find if any stream is live
  const liveStream = streams.find((s) => s.status === "live");

  return (
    <div className="space-y-6">
      {/* Top Prominent LIVE Banner */}
      {liveStream && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white rounded-3xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] pointer-events-none"
            style={{ backgroundSize: "16px 16px" }}
          />
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-background rounded-full animate-ping shrink-0" />
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-red-100">Class Status: Live</p>
              <h3 className="font-extrabold text-sm md:text-base leading-tight mt-0.5">{liveStream.title}</h3>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/watch/${liveStream.uuid}`)}
            className="bg-background hover:bg-muted text-red-700 font-bold h-9 rounded-xl px-4 cursor-pointer self-start md:self-auto shadow-sm"
          >
            Open Live Player
          </Button>
        </motion.div>
      )}

      {/* Welcome Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Welcome back, Arjun Mehta</h1>
          <p className="text-muted-foreground text-xs mt-1">Here is the active summary of your yoga teaching dashboard.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/channel/arjun-mehta"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-brand font-semibold text-xs transition-colors hover:underline"
          >
            Go to My Channel <RiArrowRightUpLine />
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Total Classes", value: "18", icon: <RiVideoLine className="text-muted-foreground" /> },
          { label: "Upcoming Booked Classes", value: "2", icon: <RiCalendarEventLine className="text-muted-foreground" /> },
          { label: "Total Admissions / Purchases", value: "107", icon: <RiShoppingBag3Line className="text-muted-foreground" /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-background border border-border p-5 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="size-11 bg-background rounded-2xl flex items-center justify-center border border-border shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-foreground mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Two Columns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Classes (66%) */}
        <div className="lg:col-span-2 bg-background border border-border p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h2 className="font-extrabold text-foreground text-sm uppercase tracking-wider">Recent Classes</h2>
            <Link to="/teacher/streams" className="text-xs text-brand font-bold hover:underline">Manage All</Link>
          </div>

          <div className="divide-y divide-stone-100">
            {streams.map((stream) => (
              <div key={stream.uuid} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-foreground text-xs leading-snug">{stream.title}</h4>
                  <p className="text-[10px] text-stone-450">{stream.date} • {stream.category}</p>
                </div>

                <div>
                  {stream.status === "live" && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 text-[9px] font-black rounded-md px-1.5 py-0.5">
                      LIVE
                    </Badge>
                  )}
                  {stream.status === "scheduled" && (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 text-[9px] font-bold rounded-md px-1.5 py-0.5">
                      SCHEDULED
                    </Badge>
                  )}
                  {stream.status === "ended" && (
                    <Badge className="bg-muted text-muted-foreground hover:bg-muted border-border text-[9px] font-bold rounded-md px-1.5 py-0.5">
                      RECORDING
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Actions Panel (33%) */}
        <div className="bg-background border border-border p-6 rounded-3xl shadow-sm space-y-4 h-fit">
          <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider border-b border-border pb-3">
            Quick Controls
          </h3>

          <div className="space-y-3 pt-1">
            <Button
              asChild
              className="w-full h-11 bg-brand hover:bg-brand-light text-white font-bold rounded-xl gap-2 cursor-pointer shadow-md shadow-brand/10 justify-start px-4 text-xs"
            >
              <Link to="/teacher/streams?create=true">
                <RiPlayListAddLine /> Create New Class
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full h-11 border-border hover:bg-background text-foreground font-bold rounded-xl gap-2 cursor-pointer justify-start px-4 text-xs"
            >
              <Link to="/teacher/streams">
                <RiBroadcastLine /> Go Live / Teach
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
