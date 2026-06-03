import { motion } from "framer-motion";
import { RiUserLine, RiShieldCheckLine, RiStarLine } from "react-icons/ri";
import SectionBadge from "./components/SectionBadge";

const teachers = [
    {
        id: 1,
        name: "Anaya Rao",
        specialty: "Vinyasa & Alignment",
        years: 8,
        rating: 4.9,
        avatar_url: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: 2,
        name: "Aakash Verma",
        specialty: "Pranayama & Breathwork",
        years: 6,
        rating: 4.8,
        avatar_url: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 3,
        name: "Sneha Patel",
        specialty: "Yin & Restorative",
        years: 5,
        rating: 4.7,
        avatar_url: "https://i.pravatar.cc/150?img=48",
    },
    {
        id: 4,
        name: "Rahul Gupta",
        specialty: "Hatha & Alignment",
        years: 10,
        rating: 4.95,
        avatar_url: "https://i.pravatar.cc/150?img=5",
    },
];

export default function Teachers() {
    return (
        <section id="teachers" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row justify-between mb-10">
                    <div className="max-w-lg flex justify-start items-start flex-col ">
                        <SectionBadge icon={RiShieldCheckLine } text="Trusted Coaches" />
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 }}
                            className="text-xl sm:text-3xl font-bold text-foreground"
                        >
                            Experienced instructors for every practice
                        </motion.h2>
                    </div>
                    <motion.a
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.12 }}
                        href="/teachers"
                        className="text-sm font-semibold text-brand hover:underline"
                    >
                        View all teachers →
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {teachers.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.45, delay: i * 0.06 }}
                            className="group rounded-3xl overflow-hidden bg-background border border-border shadow-sm hover:shadow-md shadow-brand/10 hover:-translate-y-0.5 transition-all duration-200 cursor-default p-5 flex flex-col items-start"
                        >
                            <div className="flex items-center gap-4 w-full">
                                <img src={t.avatar_url} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                                    <p className="text-xs text-muted-foreground">{t.specialty}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-muted-foreground">{t.years} yrs</div>
                                    <div className="flex items-center justify-end text-amber-500 text-sm">
                                        <RiStarLine />
                                        <span className="ml-1 text-sm font-semibold text-foreground">{t.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                                Skilled in alignment cues and safe progressions — gentle guidance with clear,
                                actionable feedback during class.
                            </p>

                            <div className="mt-4 w-full flex items-center justify-between">
                                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                                    <RiUserLine />
                                    {Math.floor(200 + i * 120).toLocaleString()} students
                                </span>
                                <button className="text-sm font-semibold text-brand hover:underline">View profile</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
