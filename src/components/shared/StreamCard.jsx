import { Link } from "react-router-dom";
import { RiLiveLine, RiTimeLine, RiUserLine, RiLockLine, RiPlayCircleLine } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import StreamCountdown from "./StreamCountdown";

const statusConfig = {
  live: { label: "LIVE", className: "bg-brand text-white" },
  scheduled: { label: "Upcoming Class", className: "bg-blue-100 text-blue-700" },
  ended: { label: "Recording", className: "bg-stone-100 text-stone-500" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-400" },
};

const gradients = [
  "from-blue-600 to-indigo-700",
  "from-violet-600 to-purple-700",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-sky-600",
];

function getGradient(uuid) {
  const idx = uuid ? uuid.charCodeAt(0) % gradients.length : 0;
  return gradients[idx];
}

export default function StreamCard({ stream, index = 0 }) {
  const { uuid, title, category, status, is_free, price, thumbnail_url, teacher, scheduled_at, purchases_count } = stream;
  const cfg = statusConfig[status] || statusConfig.ended;
  const gradient = getGradient(uuid);

  return (
    <Link
      to={`/streams/${uuid}`}
      className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Thumbnail */}
      <div className={`relative h-36 ${thumbnail_url ? "" : `bg-gradient-to-br ${gradient}`} flex items-center justify-center overflow-hidden`}>
        {thumbnail_url ? (
          <img src={thumbnail_url} alt={title} className="w-full h-full object-cover" />
        ) : (
          <RiPlayCircleLine className="text-white/30 text-5xl group-hover:text-white/50 transition-colors" />
        )}

        {/* Status badge */}
        <span className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.className}`}>
          {status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          {cfg.label}
        </span>

        {/* Price badge */}
        <span className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm ${is_free ? "bg-emerald-500/90 text-white" : "bg-black/50 text-white"}`}>
          {is_free ? "Free" : <><RiLockLine size={9} /> ${price}</>}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {category && (
          <span className="text-[10px] font-semibold text-brand uppercase tracking-wider">{category}</span>
        )}
        <h3 className="text-sm font-semibold text-stone-900 leading-snug line-clamp-2">{title}</h3>

        {status === "scheduled" && scheduled_at && (
          <StreamCountdown scheduledAt={scheduled_at} />
        )}

        <div className="flex items-center justify-between mt-auto pt-2 text-xs text-stone-400">
          {teacher && (
            <span className="flex items-center gap-1">
              <RiUserLine size={11} />
              {teacher.name}
            </span>
          )}
          {purchases_count > 0 && (
            <span className="flex items-center gap-1">
              <RiPlayCircleLine size={11} />
              {purchases_count.toLocaleString()} joined
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
