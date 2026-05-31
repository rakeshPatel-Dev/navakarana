import { motion } from "framer-motion";
import {
  RiLiveLine,
  RiGroupLine,
  RiChatSmile2Line,
  RiAwardLine,
  RiTimeLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const features = [
  {
    icon: RiLiveLine,
    title: "Live Guided Classes",
    desc: "Practice with instructors in real time for clear cues, safe pacing, and direct feedback.",
    accent: true,
  },
  {
    icon: RiGroupLine,
    title: "Community Practice",
    desc: "Join a supportive yoga community that keeps you accountable and moving consistently.",
    accent: false,
  },
  {
    icon: RiChatSmile2Line,
    title: "Form Coaching",
    desc: "Ask questions during class and get real-time posture and alignment guidance.",
    accent: false,
  },
  {
    icon: RiAwardLine,
    title: "Structured Progress",
    desc: "Build consistency with class tracks and milestones that support long-term practice.",
    accent: false,
  },
  {
    icon: RiTimeLine,
    title: "Flexible Schedule",
    desc: "Choose morning, evening, and weekend classes that fit your practice routine.",
    accent: false,
  },
  {
    icon: RiShieldCheckLine,
    title: "Supportive Space",
    desc: "Practice in a calm, respectful environment designed for mindful movement.",
    accent: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background shape */}
      <div
        aria-hidden
        className="absolute top-0 right-0 rounded-full bg-red-50 blur-3xl opacity-60 pointer-events-none"
        style={{ width: 300, height: 300 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold tracking-wide mb-4"
          >
            Why Navakarana?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-stone-900 tracking-tight"
          >
            Everything you need for a steady yoga practice
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-stone-500 text-base leading-relaxed"
          >
            Built for practitioners who want live instruction, personal alignment, and a mat that fits the way they move.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={`group rounded-3xl p-7 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${f.accent
                  ? "bg-brand text-white border-brand"
                  : "bg-white border-stone-100 hover:border-stone-200"
                }`}
            >
              <span
                className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-5 ${f.accent
                    ? "bg-white/20 text-white"
                    : "bg-stone-50 text-brand group-hover:bg-red-50"
                  }`}
              >
                <f.icon size={22} />
              </span>
              <h3
                className={`text-base font-semibold mb-2 ${f.accent ? "text-white" : "text-stone-900"
                  }`}
              >
                {f.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${f.accent ? "text-white/80" : "text-stone-500"
                  }`}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
