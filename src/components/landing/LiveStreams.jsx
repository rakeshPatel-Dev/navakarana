import { motion } from "framer-motion";
import { RiPlayCircleLine, RiUserLine, RiTimeLine } from "react-icons/ri";
import { streams } from "@/components/landing/data/streams";



export default function LiveStreams() {
  return (
    <section id="streams" className=" bg-stone-50/80 relative overflow-hidden">
      {/* Decorative shape */}
      <div
        aria-hidden
        className="absolute -bottom-16 left-0 w-65 h-65 blob-shape bg-brand/5 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-12">
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold self-center tracking-wide mb-3"
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
              <div className={`relative h-36 ${stream.thumbnail_url ? "bg-cover" : `bg-linear-to-br ${stream.gradient}`}`} style={{ backgroundImage: stream.thumbnail_url ? `url(${stream.thumbnail_url})` : undefined }}>
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
