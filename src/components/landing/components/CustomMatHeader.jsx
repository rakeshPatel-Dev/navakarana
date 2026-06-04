import { motion } from "framer-motion";
import { Scaling } from "lucide-react";
import SectionBadge from "./SectionBadge";

const CustomMatHeader = ({ features }) => {
  return (
    <div className="text-center flex flex-col items-center max-w-2xl mx-auto mb-12">
      <SectionBadge icon={Scaling} text="Custom Mat Info" />
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl font-bold text-foreground tracking-tight"
      >
        Mat Built for Your Body
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-muted-foreground text-base leading-relaxed"
      >
        Twelve body measurements feed an algorithm to generate yoga mat dimensions tailored to individual movement, stretch, and rest patterns, avoiding standard sizing.
      </motion.p>

      {/* Core sub-features list under header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-muted-foreground"
      >
        {features.map((feature) => (
          <div key={feature.title} className="flex items-center bg-linear-to-br from-foreground/5 via-foreground/8 to-muted-foreground/5 gap-2 border-x border-border px-3.5 py-2 rounded-xl shadow-xs">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light">
              <feature.icon className="w-3.5 h-3.5" />
            </span>
            <span>{feature.title}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomMatHeader;
