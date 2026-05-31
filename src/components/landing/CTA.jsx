import { motion } from "framer-motion";
import { RiArrowRightLine, RiLiveLine } from "react-icons/ri";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-stone-900 to-stone-800" />

      {/* Decorative shapes */}
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-72 h-72 blob-shape bg-brand/30 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-16 w-56 h-56 blob-shape-2 bg-white/5 pointer-events-none"
      />
      {/* Subtle grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 skew-2  pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="180%" fill="url(#cta-grid)" />
      </svg>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/20 text-red-300 text-xs font-semibold tracking-wide mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Join thousands of practitioners
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          Ready to begin
          <br />
          <span className="text-brand">your yoga practice?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-400 text-lg mb-10 max-w-xl mx-auto"
        >
          Join a live class today with no commitment. Pick a practice style, meet your instructor, and move with guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="/register"
            id="cta-register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand text-white font-semibold hover:bg-brand-light transition-colors shadow-lg shadow-brand/30"
          >
            Start Free Trial
            <RiArrowRightLine />
          </a>
          <a
            href="/streams"
            id="cta-browse"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 text-white font-semibold hover:bg-white/15 transition-colors border border-white/10"
          >
            <RiLiveLine />
            Explore Classes
          </a>
        </motion.div>
      </div>
    </section>
  );
}
