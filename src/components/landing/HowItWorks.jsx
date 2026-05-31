import { motion } from "framer-motion";
import {
  RiAccountCircleLine,
  RiSearchLine,
  RiLiveLine,
  RiTrophyLine,
} from "react-icons/ri";

const steps = [
  {
    step: "01",
    icon: RiAccountCircleLine,
    title: "Create your account",
    desc: "Sign up in seconds and save your practice preferences for faster booking.",
  },
  {
    step: "02",
    icon: RiSearchLine,
    title: "Choose your practice",
    desc: "Browse yoga styles like Vinyasa, Hatha, Yin, Pranayama, and meditation.",
  },
  {
    step: "03",
    icon: RiLiveLine,
    title: "Join live",
    desc: "Enter the class room, follow the flow, and get live feedback from your instructor.",
  },
  {
    step: "04",
    icon: RiTrophyLine,
    title: "Keep progressing",
    desc: "Track your progress, revisit recordings, and order a mat tailored to your measurements.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-stone-50 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold tracking-wide mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-stone-900 tracking-tight"
          >
            How it works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent pointer-events-none"
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.11 }}
              className="relative flex flex-col items-center text-center gap-4 px-4"
            >
              {/* Step icon circle */}
              <div className="relative">
                <span className="flex items-center justify-center w-20 h-20 rounded-3xl bg-stone-50 border border-stone-100 shadow-sm text-stone-700 mb-1 group-hover:border-brand/20 transition-colors">
                  <s.icon size={28} />
                </span>
                {/* Step number badge */}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-900 mb-1.5">
                  {s.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
