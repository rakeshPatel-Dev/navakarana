import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Eye, Star } from "lucide-react";
import SectionBadge from "./landing/components/SectionBadge";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const textLineVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 32 },
      opacity: { duration: 0.5 },
      scale: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { duration: 0.45 },
      opacity: { duration: 0.45 },
      scale: { duration: 0.6 },
    },
  }),
};

export default function StreamSlideshow({ streams = [] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimerRef = useRef(null);
  const userInteractionTimerRef = useRef(null);

  // ✅ All hooks declared before any conditional return
  const nextSlide = useCallback(() => {
    if (!streams || streams.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % streams.length);
  }, [streams]);

  const prevSlide = useCallback(() => {
    if (!streams || streams.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + streams.length) % streams.length);
  }, [streams]);

  const handleUserInteraction = useCallback((action) => {
    if (userInteractionTimerRef.current) clearTimeout(userInteractionTimerRef.current);
    if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    setIsAutoScrolling(false);
    action();
    userInteractionTimerRef.current = setTimeout(() => setIsAutoScrolling(true), 8000);
  }, []);

  // Preload next image
  useEffect(() => {
    if (!streams || streams.length === 0) return;
    const nextIndex = (current + 1) % streams.length;
    if (streams[nextIndex]?.thumbnail_url) {
      const img = new Image();
      img.src = streams[nextIndex].thumbnail_url;
    }
  }, [current, streams]);

  // Auto-scroll
  useEffect(() => {
    if (!streams || streams.length === 0) return;
    if (!isAutoScrolling) return;
    autoScrollTimerRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(autoScrollTimerRef.current);
  }, [isAutoScrolling, nextSlide, streams]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleUserInteraction(nextSlide);
      if (e.key === "ArrowLeft") handleUserInteraction(prevSlide);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUserInteraction, nextSlide, prevSlide]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(userInteractionTimerRef.current);
      clearInterval(autoScrollTimerRef.current);
    };
  }, []);

  // ✅ Conditional return AFTER all hooks
  if (!streams || streams.length === 0) {
    return (
      <div className="relative min-h-screen w-full bg-zinc-950 flex items-center justify-center rounded-2xl">
        <p className="text-foreground/40 text-sm font-mono tracking-widest uppercase">No streams available</p>
      </div>
    );
  }

  const currentStream = streams[current];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        borderRadius: "1.25rem",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "#0a0a0a",
      }}
    >
      {/* ── Background image ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${currentStream.thumbnail_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Cinematic vignette: heavy bottom, subtle top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.92) 100%)",
            }}
          />
          {/* Side fades for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7 pt-6">
        {/* Live badge */}
        <AnimatePresence mode="wait">
          {currentStream.live ? (
            <motion.div
              key="live"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(220,38,38,0.85)", backdropFilter: "blur(12px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              <span className="text-foreground text-xs font-semibold tracking-widest uppercase">Live</span>
            </motion.div>
          ) : (
            <div key="offline" />
          )}
        </AnimatePresence>

            <SectionBadge text="Featured Streams" icon={Star} />

        {/* Slide counter */}
            {/* <div
              className="px-3 py-1.5 rounded-full font-mono text-xs"
              style={{
                background: "rgba(150, 25, 25,0.2)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(150, 25, 25,0.3)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              {String(streams.length).padStart(2, "0")}
            </div> */}
      </div>

      {/* ── Nav buttons ── */}
      {[
        { dir: "left", action: prevSlide, Icon: ChevronLeft },
        { dir: "right", action: nextSlide, Icon: ChevronRight },
      ].map(({ dir, action, Icon }) => (
        <button
          key={dir}
          onClick={() => handleUserInteraction(action)}
          aria-label={dir === "left" ? "Previous slide" : "Next slide"}
          className="absolute top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 transition-all duration-200 focus:outline-none cursor-pointer"
          style={{
            [dir]: "1.25rem",
            background: "rgba(150, 25, 25,0.2)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(150, 25, 25,0.3)",
            color: "rgba(255,255,255,0.65)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(150, 25, 25,0.35)";
            e.currentTarget.style.color = "rgba(255,255,255,1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(150, 25, 25,0.2)";
            e.currentTarget.style.color = "rgba(255,255,255,0.65)";
          }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </button>
      ))}

      {/* ── Bottom info panel ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-7 pb-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Category pill */}
            <motion.div variants={textLineVariants} className="mb-3 flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "rgba(150, 25, 25,0.2)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(150, 25, 25,0.3)",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.12em",
                }}
              >
                {currentStream.category}
              </span>

              {/* Viewer count pill */}
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                style={{
                   background: "rgba(150, 25, 25,0.2)",
                  border: "1px solid rgba(150, 25, 25,0.3)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Eye size={12} strokeWidth={1.5} />
                {currentStream.viewers.toLocaleString()}
              </span>

              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                style={{
                  background: "rgba(150, 25, 25,0.2)",
                  border: "1px solid rgba(150, 25, 25,0.3)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Clock size={12} strokeWidth={1.5} />
                {currentStream.duration}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={textLineVariants}
              style={{
                fontSize: "clamp(1.75rem, 5.5vw, 3.5rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                marginBottom: "0.6rem",
                maxWidth: "22ch",
              }}
            >
              {currentStream.title}
            </motion.h1>

            {/* Host row + CTA */}
            <motion.div
              variants={textLineVariants}
              className="flex items-center justify-between"
              style={{ marginTop: "1rem" }}
            >
              {/* Host info */}
              <div className="flex items-center gap-3">
                {/* Avatar initials */}
                <div
                  className="flex items-center justify-center rounded-full text-sm font-semibold shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(150, 25, 25,0.12)",
                    border: "1px solid rgba(150, 25, 25,0.3)",
                    color: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {currentStream.host
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", marginBottom: 1 }}>Hosted by</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                    {currentStream.host}
                  </p>
                </div>
              </div>

              {/* CTA */}
              {currentStream.live ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                  style={{
                    background: "#fff",
                    color: "#0a0a0a",
                    letterSpacing: "-0.01em",
                    boxShadow: "0 0 32px rgba(255,255,255,0.15)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#ef4444" }}
                  />
                  Join Stream
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                  style={{
                    background: "rgba(150, 25, 25,0.1)",
                    color: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(150, 25, 25,0.18)",
                    backdropFilter: "blur(12px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Watch Replay →
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress + dots ── */}
        <div className="flex items-center justify-between mt-6">
          {/* Auto-scroll progress bar */}
          <div className="flex items-center gap-2.5">
            <div
              className="h-px overflow-hidden rounded-full"
              style={{ width: 48, background: "rgba(255,255,255,0.15)" }}
            >
              <motion.div
                key={`${current}-${isAutoScrolling}`}
                className="h-full rounded-full"
                style={{ background: "rgba(255,255,255,0.7)" }}
                initial={{ width: "0%" }}
                animate={{ width: isAutoScrolling ? "100%" : "0%" }}
                transition={
                  isAutoScrolling
                    ? { duration: 6, ease: "linear" }
                    : { duration: 0 }
                }
              />
            </div>
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {isAutoScrolling ? "auto" : "paused"}
            </span>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {streams.map((_, idx) => (
              <button
                key={idx}
                onClick={() =>
                  handleUserInteraction(() => {
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  })
                }
                aria-label={`Go to slide ${idx + 1}`}
                className="focus:outline-none"
              >
                <div
                  style={{
                    height: 3,
                    borderRadius: 99,
                    background: idx === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                    width: idx === current ? 28 : 8,
                    transition: "all 0.3s ease",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}