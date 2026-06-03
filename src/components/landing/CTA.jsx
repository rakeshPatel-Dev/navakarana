import { motion } from "framer-motion";
import { RiArrowRightLine, RiLiveLine } from "react-icons/ri";
import SectionBadge from "./components/SectionBadge";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 max-w-7xl mx-auto rounded-4xl relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-foreground via-foreground to-foreground/90" />

      {/* Decorative shapes */}
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-72 h-72 z-15 blob-shape bg-brand/30 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-16 w-56 h-56 z-15 blob-shape-2 bg-background/5 pointer-events-none"
      />
      {/* Subtle grid */}
      <svg
        className="absolute z-10 inset-0 w-full h-full skew-2 opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cta-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none"  stroke="var(--background)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="180%" fill="url(#cta-grid)" />
      </svg>

      <div className="relative max-w-4xl z-20 mx-auto px-6 text-center flex flex-col items-center">
       <SectionBadge icon={GoDotFill} iconClassName="animate-pulse text-brand/80" text="Join Thousands of Practiceners" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold text-background tracking-tight leading-tight mb-6"
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
          className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
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
          <Link
            to="/register"
            id="cta-register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand text-white font-semibold hover:bg-brand-light transition-colors shadow-lg shadow-brand/30"
          >
            Start Free Trial
            <RiArrowRightLine />
          </Link>
          <Link
            to="/streams"
            id="cta-browse"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-background/5 text-background font-semibold hover:bg-background/10 transition-colors border border-background/10"
          >
            <RiLiveLine />
            Explore Classes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
