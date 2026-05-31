import { motion } from "framer-motion";
import { RiPlayCircleLine, RiUserLine, RiTimeLine } from "react-icons/ri";

const streams = [
  {
    id: 1,
    title: "Sunrise Vinyasa Flow",
    host: "Anaya Rao",
    category: "Vinyasa",
    viewers: 892,
    duration: "1h 20m",
    live: true,
    gradient: "from-emerald-500 to-teal-700",
  },
  {
    id: 2,
    title: "Breathwork Reset for Busy Days",
    host: "Aakash Verma",
    category: "Pranayama",
    viewers: 654,
    duration: "55m",
    live: true,
    gradient: "from-stone-700 to-emerald-600",
  },
  {
    id: 3,
    title: "Evening Yin and Release",
    host: "Sneha Patel",
    category: "Yin Yoga",
    viewers: 441,
    duration: "30m",
    live: false,
    gradient: "from-amber-500 to-orange-700",
  },
  {
    id: 4,
    title: "Hatha Alignment Essentials",
    host: "Rahul Gupta",
    category: "Hatha Flow",
    viewers: 1203,
    duration: "2h",
    live: true,
    gradient: "from-rose-500 to-amber-600",
  },
];

export default function LiveStreams() {
  return (
    <section id="streams" className="py-24 bg-stone-50/80 relative overflow-hidden">
      {/* Decorative shape */}
      <div
        aria-hidden
        className="absolute -bottom-16 left-0 w-[260px] h-[260px] blob-shape bg-brand/5 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold tracking-wide mb-3"
            >
              Happening Now
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-stone-900 tracking-tight"
            >
              Featured Live Classes
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="/streams"
            className="text-sm font-semibold text-brand hover:underline"
          >
            View all classes →
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {streams.map((stream, i) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className={`relative h-36 bg-gradient-to-br ${stream.gradient} flex items-center justify-center`}>
                <RiPlayCircleLine className="text-white/40 text-5xl group-hover:text-white/60 transition-colors" />
                {stream.live && (
                  <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-brand text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <RiTimeLine size={10} />
                  {stream.duration}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <span className="text-[10px] font-semibold text-brand uppercase tracking-wider">
                  {stream.category}
                </span>
                <h3 className="text-sm font-semibold text-stone-900 mt-1 leading-snug line-clamp-2">
                  {stream.title}
                </h3>
                <div className="flex items-center justify-between mt-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <RiUserLine size={11} />
                    {stream.host}
                  </span>
                  <span className="flex items-center gap-1">
                    <RiPlayCircleLine size={11} />
                    {stream.viewers.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
