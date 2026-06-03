import { motion } from "framer-motion";


const SectionBadge = ({
    text = " Title",
    icon: Icon = null,
    iconClassName: className = "",

}) => {
    return (
        <div className="text-center max-w-xl">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-full bg-brand/10 text-brand-dark text-xs font-semibold tracking-wide mb-4 border border-brand/10 dark:bg-brand-light/10 dark:text-brand-light"
            >
                {Icon && <Icon className={`w-3 h-3 ${className}`} />}
                <span>
                    {text}
                </span>
            </motion.div>
        </div>
    )
}

export default SectionBadge
