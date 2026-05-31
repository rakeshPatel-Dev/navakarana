import { motion } from "framer-motion";
import { RiArrowRightLine, RiLiveLine } from "react-icons/ri";

const stats = [
  { value: "2,400+", label: "Active Practitioners" },
  { value: "180+", label: "Certified Instructors" },
  { value: "38", label: "Live Right Now" },
  { value: "4.9★", label: "Average Rating" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-stone-50 border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-stone-900 tracking-tight">
                {s.value}
              </p>
              <p className="text-sm text-stone-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
