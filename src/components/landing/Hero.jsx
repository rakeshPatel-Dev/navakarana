import { motion } from "framer-motion";
import {
  RiLiveLine,
  RiArrowRightLine,
  RiStarFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

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
    <section className="relative min-h-150 flex items-center overflow-hidden pt-15 bg-linear-to-br from-stone-50 via-white to-emerald-50/25">
      {/* Grid Pattern at Left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute skew-6 inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[50px_50px]"
          style={{
            maskImage: 'radial-gradient(circle at center, black 0%, black 40%, transparent 80%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, black 40%, transparent 80%, transparent 100%)'
          }}
        />
      </div>


      {/* Background decorative shapes */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-120 h-120 blob-shape shadow-lg shadow-brand blur-2xl bg-brand/10 border border-brand pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-32 border border-brand -right-32 w-100 h-100 blob-shape bg-brand/20 blur-2xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-center gap-16 items-center w-full relative z-10">
        {/* Left Content */}
        <div className="flex flex-col items-center justify-center gap-7">
          {/* Live badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 self-center px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold tracking-wide"
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
            className="text-5xl lg:text-7xl text-center tracking-tight text-primary font-black leading-[1.1]"
          >
            Yoga designed
            <br />
            <span className="text-brand font-bold font-mono">Around You.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg text-center text-stone-500 leading-relaxed max-w-2xl"
          >
            Join live yoga classes from certified instructors and order custom mats precision-crafted to your measurements for better alignment, comfort, and flow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/streams"
              id="hero-browse-streams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand text-white font-semibold text-sm hover:bg-brand-light transition-colors shadow-md shadow-brand/20"
            >
              Explore Classes
              <RiArrowRightLine />
            </Link>
            <Link
              to="/teacher/dashboard"
              id="hero-create-stream"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-200 text-stone-700 font-semibold text-sm hover:bg-stone-50 hover:border-stone-300 transition-colors"
            >
              <RiLiveLine className="text-brand" />
              Teach Yoga
            </Link>
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
      </div>
    </section>
  );
}