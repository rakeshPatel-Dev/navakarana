import { motion } from "framer-motion";
import { RiDoubleQuotesL, RiStarFill } from "react-icons/ri";

const testimonials = [
  {
    name: "Meera Nair",
    role: "Practitioner, Bengaluru",
    quote:
      "Navakarana made it easy to stay consistent. The live yoga classes feel personal, grounding, and much more effective than random videos.",
    rating: 5,
    avatar: "MN",
    color: "#961919",
  },
  {
    name: "Tanvir Hussain",
    role: "Home Practitioner, Trichy",
    quote:
      "The breathwork and alignment cues changed my practice. I finally understand how to move safely and keep showing up every week.",
    rating: 5,
    avatar: "TH",
    color: "#2563eb",
  },
  {
    name: "Lakshmi Reddy",
    role: "Yoga Teacher, Hyderabad",
    quote:
      "The custom mat workflow is a thoughtful touch. It feels like the platform understands both teaching and personal practice.",
    rating: 5,
    avatar: "LR",
    color: "#16a34a",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Top diagonal shape */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-200 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-12 w-48 h-48 rounded-full bg-red-50 blur-3xl opacity-80 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold tracking-wide mb-4"
          >
            Student Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-stone-900 tracking-tight"
          >
            Loved by practitioners
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl p-7 bg-stone-50 border border-stone-100 hover:border-stone-200 hover:shadow-md transition-all duration-200"
            >
              {/* Quote icon */}
              <RiDoubleQuotesL className="text-brand/20 text-4xl absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-0.5 text-amber-400 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <RiStarFill key={j} size={14} />
                ))}
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-2xl text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-stone-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
