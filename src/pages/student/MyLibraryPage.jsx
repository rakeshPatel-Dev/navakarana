import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiPlayCircleLine, RiFolderVideoLine, RiBookOpenLine, RiReceiptLine } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_PURCHASES = [
  {
    uuid: "live-stream-1",
    title: "Navakarana Yoga Vinyasa: Strength and Alignment",
    teacherName: "Arjun Mehta",
    purchaseType: "Stream Access",
    amountPaid: "0.00",
    purchasedAt: "2026-05-30T10:00:00Z",
    status: "live",
    hasRecording: false
  },
  {
    uuid: "live-stream-2",
    title: "Pranayama & Breathwork Foundation",
    teacherName: "Sarah Connor",
    purchaseType: "Stream Access",
    amountPaid: "15.00",
    purchasedAt: "2026-05-29T15:30:00Z",
    status: "live",
    hasRecording: false
  },
  {
    uuid: "ended-stream-1",
    title: "Yin Yoga: Deep Joint Opening & Mindfulness",
    teacherName: "Arjun Mehta",
    purchaseType: "Recording",
    amountPaid: "15.00",
    purchasedAt: "2026-05-25T08:45:00Z",
    status: "ended",
    hasRecording: true
  },
  {
    uuid: "scheduled-stream-1",
    title: "Hatha Flow for Flexibility & Relaxation",
    teacherName: "Arjun Mehta",
    purchaseType: "Stream Access",
    amountPaid: "12.50",
    purchasedAt: "2026-05-28T12:00:00Z",
    status: "scheduled",
    hasRecording: false
  }
];

export default function MyLibraryPage() {
  const [purchases, setPurchases] = useState(MOCK_PURCHASES);

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="border-b border-stone-200/60 pb-5">
          <span className="text-brand font-bold text-xs uppercase tracking-widest">My Account</span>
          <h1 className="text-3xl font-extrabold text-stone-900 mt-1 flex items-center gap-2">
            <RiBookOpenLine /> My Learning Library
          </h1>
          <p className="text-stone-500 text-sm mt-1">Access your purchased live classes, class recordings, and upcoming sessions.</p>
        </div>

        {purchases.length > 0 ? (
          <div className="space-y-4">
            {purchases.map((item) => {
              const showWatchButton = item.status === "live" || item.status === "ended";

              return (
                <motion.div
                  key={item.uuid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-stone-100 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:shadow-md hover:border-stone-200/50"
                >
                  <div className="flex items-start md:items-center gap-4">
                    {/* Icon/Thumbnail area */}
                    <div className="size-16 rounded-2xl bg-gradient-to-tr from-stone-200 to-stone-100 flex items-center justify-center shrink-0 border border-stone-200/40 text-stone-400">
                      <RiFolderVideoLine className="size-8" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-stone-200 text-stone-600 rounded-md font-semibold text-[10px]"
                        >
                          {item.purchaseType}
                        </Badge>
                        {item.status === "live" && (
                          <Badge className="bg-red-600 hover:bg-red-700 text-white border-transparent text-[10px] font-bold tracking-wider animate-pulse">
                            🔴 LIVE NOW
                          </Badge>
                        )}
                        {item.status === "scheduled" && (
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-transparent text-[10px] font-bold">
                            📅 SCHEDULED
                          </Badge>
                        )}
                        {item.status === "ended" && (
                          <Badge className="bg-stone-600 hover:bg-stone-700 text-white border-transparent text-[10px] font-bold">
                            🎥 RECORDING
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-extrabold text-stone-900 text-base md:text-lg leading-snug">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 font-medium">
                        <span>Instructor: <span className="font-semibold text-stone-700">{item.teacherName}</span></span>
                        <span className="hidden sm:inline text-stone-300">•</span>
                        <span className="flex items-center gap-1">
                          <RiReceiptLine /> Paid: <span className="font-semibold text-stone-700">${item.amountPaid}</span>
                        </span>
                        <span className="hidden sm:inline text-stone-300">•</span>
                        <span>Purchased: {new Date(item.purchasedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0">
                    {showWatchButton ? (
                      <Button
                        asChild
                        className="w-full md:w-auto bg-brand hover:bg-brand-light text-white font-bold h-10 px-5 rounded-xl cursor-pointer shadow-md shadow-brand/10 gap-1.5"
                      >
                        <Link to={`/watch/${item.uuid}`}>
                          <RiPlayCircleLine className="size-4" /> Watch Now
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full md:w-auto border-stone-200 hover:bg-stone-50 text-stone-600 font-bold h-10 px-5 rounded-xl cursor-pointer"
                      >
                        <Link to={`/streams/${item.uuid}`}>
                          View Schedule
                        </Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-stone-100 rounded-3xl p-16 text-center shadow-sm">
            <div className="text-stone-300 text-5xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-stone-800">Your library is empty</h3>
            <p className="text-stone-400 text-sm mt-1">Browse our active classes directory to purchase access.</p>
            <Button asChild className="bg-brand hover:bg-brand-light mt-6 font-semibold rounded-xl text-white">
              <Link to="/streams">Explore Classes</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
