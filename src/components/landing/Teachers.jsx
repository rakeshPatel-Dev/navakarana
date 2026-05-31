import { motion } from "framer-motion";
import { RiUserLine, RiShieldCheckLine, RiStarLine } from "react-icons/ri";

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
        <section id="teachers" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold tracking-wide mb-2"
                        >
                            Meet Our Teachers
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 }}
                            className="text-3xl font-bold text-stone-900"
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
                            className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default p-5 flex flex-col items-start"
                        >
                            <div className="flex items-center gap-4 w-full">
                                <img src={t.avatar_url} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-stone-900">{t.name}</h3>
                                    <p className="text-xs text-stone-500">{t.specialty}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-stone-500">{t.years} yrs</div>
                                    <div className="flex items-center justify-end text-amber-500 text-sm">
                                        <RiStarLine />
                                        <span className="ml-1 text-sm font-semibold text-stone-900">{t.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-stone-500 leading-relaxed">
                                Skilled in alignment cues and safe progressions — gentle guidance with clear,
                                actionable feedback during class.
                            </p>

                            <div className="mt-4 w-full flex items-center justify-between">
                                <span className="inline-flex items-center gap-2 text-xs text-stone-500">
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
