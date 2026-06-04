import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react";

const hotspots = [
  {
    id: 0,
    title: "Dimensions Calibration",
    desc: "Width and length are generated dynamically using your height and shoulder width. This ensures you never step off the mat during dynamic flows.",
    coords: [{ x: 25, y: 35 }],
    label: "Dimensions",
  },
  {
    id: 1,
    title: "Wingspan Alignment Gates",
    desc: "Hand markings are spaced according to your shoulder width and arm length. It ensures safe wrist placement and eliminates shoulder impingement in Downward Dog.",
    coords: [
      { x: 65, y: 110 },
      { x: 135, y: 110 },
    ],
    label: "Hands Alignment",
  },
  {
    id: 2,
    title: "Pelvic Stance Alignment",
    desc: "Foot guidelines are positioned to align with your hip width and leg length. This stabilizes your balance in Warrior poses and lunges.",
    coords: [
      { x: 60, y: 300 },
      { x: 140, y: 300 },
    ],
    label: "Feet Alignment",
  },
  {
    id: 3,
    title: "Center of Gravity Lotus",
    desc: "The central focal lotus represents your balancing center. The algorithm places it based on your torso-to-limb ratio for perfect pivot alignment.",
    coords: [{ x: 100, y: 200 }],
    label: "Core Balancing",
  },
];

const CustomMatSvg = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="lg:col-span-5 flex flex-col justify-between bg-card/20 border border-border/40 p-6 md:p-8 rounded-3xl backdrop-blur-xs">
      <div>
        <h3 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2 mb-1.5">
          <MousePointer2 className="w-4 h-4 text-brand dark:text-brand-light" />
          Interactive Preview
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          Hover over the active alignment gates on the mat to inspect sizing calibrations.
        </p>

        <div
          className="relative w-full max-w-60 sm:max-w-65 mx-auto bg-card/40 dark:bg-white/5 border border-border/30 p-5 rounded-3xl shadow-xs overflow-visible"
          onMouseMove={handleMouseMove}
        >
          <svg
            viewBox="0 0 200 400"
            className="w-full h-auto drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="matGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.08} />
                <stop offset="50%" stopColor="var(--brand)" stopOpacity={0.03} />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            {/* Mat Outer Border */}
            <rect
              x="15"
              y="15"
              width="170"
              height="370"
              rx="16"
              fill="url(#matGrad)"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeOpacity={0.25}
              className="transition-all duration-300"
            />

            {/* Alignment lines */}
            <line
              x1="100"
              y1="20"
              x2="100"
              y2="380"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeOpacity={0.25}
            />
            <line
              x1="20"
              y1="200"
              x2="180"
              y2="200"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeOpacity={0.2}
            />

            {/* Angles */}
            <line
              x1="100"
              y1="280"
              x2="55"
              y2="325"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeOpacity={0.25}
            />
            <line
              x1="100"
              y1="280"
              x2="145"
              y2="325"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeOpacity={0.25}
            />
            <line
              x1="100"
              y1="120"
              x2="55"
              y2="75"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeOpacity={0.25}
            />
            <line
              x1="100"
              y1="120"
              x2="145"
              y2="75"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeOpacity={0.25}
            />

            {/* Concentric circles */}
            <circle
              cx="100"
              cy="200"
              r="18"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1"
              strokeOpacity={0.3}
            />
            <circle
              cx="100"
              cy="200"
              r="8"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.2"
              strokeOpacity={0.4}
            />

            {/* Hand indicators */}
            <circle
              cx="65"
              cy="110"
              r="5"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.5"
              strokeOpacity={0.35}
            />
            <circle
              cx="135"
              cy="110"
              r="5"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.5"
              strokeOpacity={0.35}
            />

            {/* Foot indicators */}
            <rect
              x="55"
              y="295"
              width="10"
              height="10"
              rx="1.5"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.5"
              strokeOpacity={0.35}
            />
            <rect
              x="135"
              y="295"
              width="10"
              height="10"
              rx="1.5"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.5"
              strokeOpacity={0.35}
            />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <g
                key={spot.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {spot.coords.map((coord, ci) => (
                  <React.Fragment key={ci}>
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={activeHotspot === spot.id ? 14 : 9}
                      fill="var(--brand)"
                      fillOpacity={activeHotspot === spot.id ? 0.22 : 0.12}
                      className="transition-all duration-300"
                      style={{
                        transformOrigin: `${coord.x}px ${coord.y}px`,
                      }}
                    />
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={activeHotspot === spot.id ? 8 : 6}
                      fill="var(--brand)"
                      fillOpacity={activeHotspot === spot.id ? 0.7 : 0.4}
                      stroke="#fff"
                      strokeWidth={activeHotspot === spot.id ? 1.5 : 0}
                      className="transition-all duration-300"
                    />
                    <circle cx={coord.x} cy={coord.y} r="2" fill="#fff" />
                  </React.Fragment>
                ))}
              </g>
            ))}
          </svg>

          {/* Floating boundary-aware cursor tooltip */}
          <AnimatePresence>
            {activeHotspot !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.12 }}
                className="absolute bg-background/95 border border-border/80 p-3 rounded-2xl shadow-xl pointer-events-none z-50 w-55 backdrop-blur-md text-left"
                style={{
                  left: mousePos.x > 130 ? mousePos.x - 238 : mousePos.x + 18,
                  top: mousePos.y > 220 ? mousePos.y - 120 : mousePos.y + 18,
                }}
              >
                <h4 className="text-[11px] font-bold text-brand dark:text-brand-light flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  {hotspots[activeHotspot].title}
                </h4>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                  {hotspots[activeHotspot].desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full">
        <Link
          to="/mat/order"
          className="w-full sm:w-1/2 inline-flex items-center justify-center rounded-full bg-brand text-white px-5 py-3 text-sm font-semibold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 active:scale-98"
        >
          Design Your Mat
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link
          to="/mat/info"
          className="w-full sm:w-1/2 inline-flex items-center justify-center rounded-full border border-border/80 bg-card hover:bg-muted text-foreground px-5 py-3 text-sm font-semibold transition-all active:scale-98"
        >
          Detailed Specs
        </Link>
      </div>
    </div>
  );
};

export default CustomMatSvg;
