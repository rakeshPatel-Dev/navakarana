import { motion } from "framer-motion";
import {
  RiLiveLine,
  RiPlayCircleLine,
  RiArrowRightLine,
  RiStarFill,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const avatars = [
  { initials: "AK", color: "#961919" },
  { initials: "MT", color: "#c06020" },
  { initials: "RJ", color: "#2563eb" },
  { initials: "SP", color: "#16a34a" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-linear-to-br from-stone-50 via-white to-emerald-50/25">
      {/* Background decorative shapes */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-120 h-120 blob-shape opacity-[0.07] bg-brand pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 w-90 h-90 blob-shape-2 opacity-[0.06] bg-stone-400 pointer-events-none"
      />
      {/* Floating ring decoration */}
      <div
        aria-hidden
        className="absolute top-1/3 right-[8%] w-20 h-20 rounded-full border-4 border-brand/15 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/4 left-[6%] w-10 h-10 rounded-full border-2 border-stone-300/50 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Content */}
        <div className="flex flex-col gap-7">
          {/* Live badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            Yoga Practice Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1]"
          >
            Yoga designed
            <br />
            <span className="text-brand font-mono">Around You.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg text-stone-500 leading-relaxed max-w-lg"
          >
            Join live guided classes from certified yoga instructors and order a custom mat precision-crafted from your measurements for better alignment, comfort, and flow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-3"
          >
            <a
              href="/streams"
              id="hero-browse-streams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand text-white font-semibold text-sm hover:bg-brand-light transition-colors shadow-md shadow-brand/20"
            >
              Explore Classes
              <RiArrowRightLine />
            </a>
            <a
              href="/teacher/dashboard"
              id="hero-create-stream"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm hover:bg-stone-50 hover:border-stone-300 transition-colors"
            >
              <RiLiveLine className="text-brand" />
              Teach Yoga
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className="w-8 h-8 rounded-full border-2 border-white text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: a.color }}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="text-sm text-stone-500">
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
              </div>
              <span>Trusted by 2,400+ practitioners</span>
            </div>
          </motion.div>
        </div>

        {/* Right — Visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Main card */}
          <div className="relative rounded-4xl overflow-hidden bg-stone-900 shadow-2xl shadow-stone-900/20 aspect-4/3">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/sYboYlh0efg?si=_L2vTlON1F9CG9Yh&autoplay=1&mute=1&playsinline=1&controls=0&rel=0"
              title="Yoga class preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            {/* Live indicator overlay */}
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-brand px-3 py-1.5 rounded-full text-white text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </div>

            {/* Viewer count */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs">
              <RiPlayCircleLine />
              1,247 practicing
            </div>

            {/* Stream info bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 to-transparent p-5">
              <p className="text-white font-semibold text-sm">
                Sunrise Vinyasa Flow - Live Class
              </p>
              <p className="text-stone-400 text-xs mt-0.5">
                by Arjun Mehta · 43 min in session
              </p>
            </div>
          </div>

          {/* Floating stat card — viewers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -right-5 top-15 bg-white rounded-2xl shadow-lg border border-brand/20 bounce px-4 py-3 flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <RiPlayCircleLine size={18} />
            </span>
            <div>
              <p className="text-xs text-stone-400">Live now</p>
              <p className="text-sm font-bold text-stone-900">38 classes</p>
            </div>
          </motion.div>

          {/* Floating stat card — rating */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="absolute -left-5 bottom-15 bg-white rounded-2xl shadow-lg border bounce border-brand/20 px-4 py-3 flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <RiStarFill size={18} />
            </span>
            <div>
              <p className="text-xs text-stone-400">Avg rating</p>
              <p className="text-sm font-bold text-stone-900">4.9 / 5.0</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
