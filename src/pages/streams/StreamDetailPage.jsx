import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiArrowLeftLine, RiUserLine, RiFolderLine, RiShoppingBag3Line,
  RiVideoLine, RiErrorWarningLine, RiCalendarTodoLine, RiShieldFlashLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StreamCountdown from "@/components/shared/StreamCountdown";

// All mocks matching standard stream lists
const STREAMS_DB = {
  "live-stream-1": {
    uuid: "live-stream-1",
    title: "Navakarana Yoga Vinyasa: Strength and Alignment",
    description: "An intensive live session focused on developing core stability, strength, and correct anatomical alignment. Perfect for intermediate practitioners looking to deepen their practice.\n\nIn this session, we will flow through an alignment-based practice focusing on activating the deep core, pelvic floor stabilizers, and upper body support. You will receive real-time cues, alignment adjustments recommendations, and modifications.",
    category: "Vinyasa",
    thumbnail_url: null,
    status: "live",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date(Date.now() - 3600000).toISOString(),
    purchases_count: 42,
    teacher: { uuid: "teacher-arjun", name: "Arjun Mehta", slug: "arjun-mehta" }
  },
  "live-stream-2": {
    uuid: "live-stream-2",
    title: "Pranayama & Breathwork Foundation",
    description: "Deep dive into breathwork techniques. Learn how to control energy flow, quiet the mind, and increase vital lung capacity through guided breath sequences.\n\nPranayama is the yogic practice of breath control. In Sanskrit, prana means vital life force, and ayama means to extend or draw out. By learning how to consciously regulate your breathing patterns, you can directly influence your nervous system—calming a hyperactive mind, relieving stress, and bringing physical harmony to the body.",
    category: "Pranayama",
    thumbnail_url: null,
    status: "live",
    is_free: false,
    price: "15.00",
    scheduled_at: new Date(Date.now() - 1800000).toISOString(),
    purchases_count: 18,
    teacher: { uuid: "teacher-sarah", name: "Sarah Connor", slug: "sarah-connor" }
  },
  "scheduled-stream-1": {
    uuid: "scheduled-stream-1",
    title: "Hatha Flow for Flexibility & Relaxation",
    description: "A calming Hatha flow session to stretch out muscles, improve range of motion, and release daily accumulated tension. Slow-paced with static holds and deep stretching.",
    category: "Hatha Flow",
    thumbnail_url: null,
    status: "scheduled",
    is_free: false,
    price: "12.50",
    scheduled_at: new Date(Date.now() + 172800000).toISOString(),
    purchases_count: 9,
    teacher: { uuid: "teacher-arjun", name: "Arjun Mehta", slug: "arjun-mehta" }
  },
  "scheduled-stream-2": {
    uuid: "scheduled-stream-2",
    title: "Ashtanga Yoga Primary Series Introduction",
    description: "Introduction to the sequence and structure of Ashtanga primary series. Focus on Bandhas, Drishti, and Ujjayi breath. Dynamic, sweaty, and structured.",
    category: "Ashtanga",
    thumbnail_url: null,
    status: "scheduled",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    purchases_count: 132,
    teacher: { uuid: "teacher-david", name: "David Swenson", slug: "david-swenson" }
  },
  "ended-stream-1": {
    uuid: "ended-stream-1",
    title: "Yin Yoga: Deep Joint Opening & Mindfulness",
    description: "Recorded restorative session holding passive poses for longer periods to target connective tissues and cultivate mindfulness.\n\nYin yoga is a slow-paced style of yoga as exercise, incorporating principles of traditional Chinese medicine, with asanas that are held for longer periods of time than in other styles.",
    category: "Yin Yoga",
    thumbnail_url: null,
    status: "ended",
    is_free: false,
    price: "18.00",
    recording_price: "15.00",
    recording_url: "https://example.com/recording.mp4",
    scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    purchases_count: 56,
    teacher: { uuid: "teacher-arjun", name: "Arjun Mehta", slug: "arjun-mehta" }
  },
  "ended-stream-2": {
    uuid: "ended-stream-2",
    title: "Chakra Meditation for Inner Balance",
    description: "Guidance on focusing energy along the spine, clearing blockages, and aligning the 7 chakras for peace and clarity.",
    category: "Meditation",
    thumbnail_url: null,
    status: "ended",
    is_free: true,
    price: "0.00",
    recording_price: "0.00",
    recording_url: "https://example.com/recording.mp4",
    scheduled_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    purchases_count: 245,
    teacher: { uuid: "teacher-david", name: "David Swenson", slug: "david-swenson" }
  }
};

export default function StreamDetailPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentCancelled = searchParams.get("payment") === "cancelled";

  // Local purchase simulation database key
  const purchaseKey = `nk_purchased_${uuid}`;
  const [purchased, setPurchased] = useState(
    () => localStorage.getItem(purchaseKey) === "true"
  );

  // Get stream from database or use default mock
  const stream = STREAMS_DB[uuid] || {
    uuid: uuid || "default-stream",
    title: "Introductory Yoga & Movement Session",
    description: "A welcoming starter session designed to introduce you to the fundamentals of mindful movement, gentle yoga poses, and breath awareness.",
    category: "General",
    thumbnail_url: null,
    status: "live",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date().toISOString(),
    purchases_count: 5,
    teacher: { uuid: "teacher-default", name: "Instructor Team", slug: "instructor-team" }
  };

  const handlePurchase = () => {
    // In-memory purchase simulator
    localStorage.setItem(purchaseKey, "true");
    setPurchased(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/streams"
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors text-sm mb-6 font-semibold"
        >
          <RiArrowLeftLine /> Back to classes
        </Link>

        {/* Payment Cancelled Banner */}
        {paymentCancelled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-brand/5 border border-brand/20 text-brand-dark rounded-2xl flex items-start gap-3"
          >
            <RiErrorWarningLine className="size-5 shrink-0 mt-0.5 text-brand" />
            <div>
              <p className="font-bold text-sm">Purchase Cancelled</p>
              <p className="text-xs text-stone-500 mt-0.5">The payment process was interrupted. You were not charged. You can try again below.</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Details Panel (66%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail Placeholder */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden relative shadow-md bg-linear-to-tr from-stone-900 to-stone-700 flex flex-col items-center justify-center p-8 text-center text-white">
              {/* Overlay graphics */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand/10 rounded-full blur-2xl pointer-events-none" />

              {stream.status === "live" ? (
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" /> Live Now
                </div>
              ) : stream.status === "scheduled" ? (
                <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <RiCalendarTodoLine className="size-3.5" /> Upcoming
                </div>
              ) : (
                <div className="absolute top-4 left-4 bg-stone-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <RiVideoLine className="size-3.5" /> Recording
                </div>
              )}

              <RiVideoLine className="size-16 text-stone-400/80 mb-3" />
              <h3 className="text-xl md:text-2xl font-bold max-w-lg">{stream.title}</h3>
              <p className="text-stone-300 text-xs mt-2 font-medium">Session UUID: {stream.uuid}</p>
            </div>

            {/* Core Info */}
            <div className="bg-white border border-stone-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-stone-200 text-stone-600 font-semibold px-2.5 py-0.5 rounded-md gap-1">
                    <RiFolderLine /> {stream.category}
                  </Badge>
                  <Badge variant="outline" className="border-stone-200 text-stone-600 font-semibold px-2.5 py-0.5 rounded-md gap-1">
                    <RiShoppingBag3Line /> {stream.purchases_count} joined
                  </Badge>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight">
                  {stream.title}
                </h1>
              </div>

              {/* Instructor Profile Header */}
              <div className="flex items-center gap-3 border-y border-stone-100 py-4">
                <div className="size-10 bg-stone-100 border border-stone-200 rounded-full flex items-center justify-center font-bold text-stone-700 text-sm">
                  {stream.teacher.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">Hosted by</p>
                  <Link
                    to={`/channel/${stream.teacher.slug || "unknown"}`}
                    className="text-stone-850 hover:text-brand font-bold text-sm transition-colors hover:underline"
                  >
                    {stream.teacher.name}
                  </Link>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-stone-850 mb-2.5 text-sm uppercase tracking-wider">About This Class</h3>
                <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                  {stream.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Panel (33%) */}
          <div className="space-y-6">
            <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm sticky top-6">
              <h3 className="font-extrabold text-stone-900 text-lg mb-4">Access Details</h3>

              {/* Case 1: Stream is Live & Free */}
              {stream.status === "live" && stream.is_free && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-500">This class is live right now and free to join for everyone.</p>
                  <Button
                    onClick={() => navigate(`/watch/${stream.uuid}`)}
                    className="w-full bg-brand hover:bg-brand-light text-white font-bold h-11 rounded-xl cursor-pointer shadow-lg shadow-brand/15"
                  >
                    🔴 Join Now
                  </Button>
                </div>
              )}

              {/* Case 2: Stream is Live, Paid & Not Purchased */}
              {stream.status === "live" && !stream.is_free && !purchased && (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline py-2 border-b border-stone-100">
                    <span className="text-stone-500 text-sm">Access Fee</span>
                    <span className="text-2xl font-black text-stone-900">${stream.price}</span>
                  </div>
                  <p className="text-xs text-stone-500">This is a premium live class. Access includes the live session and the recorded playback.</p>
                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold h-11 rounded-xl cursor-pointer"
                  >
                    Reserve Spot
                  </Button>
                </div>
              )}

              {/* Case 3: Stream is Live, Paid & Purchased */}
              {stream.status === "live" && !stream.is_free && purchased && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-2">
                    <RiShieldFlashLine className="size-4 shrink-0 text-emerald-600" />
                    You reserved your spot!
                  </div>
                  <Button
                    onClick={() => navigate(`/watch/${stream.uuid}`)}
                    className="w-full bg-brand hover:bg-brand-light text-white font-bold h-11 rounded-xl cursor-pointer shadow-lg shadow-brand/15"
                  >
                    🔴 Join Live Class
                  </Button>
                </div>
              )}

              {/* Case 4: Stream is Scheduled */}
              {stream.status === "scheduled" && (
                <div className="space-y-4">
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1 text-center">
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Starts In</p>
                    <StreamCountdown scheduledAt={stream.scheduled_at} />
                  </div>

                  <div className="flex justify-between items-baseline py-2 border-b border-stone-100">
                    <span className="text-stone-500 text-sm">Admission</span>
                    <span className="text-xl font-extrabold text-stone-900">
                      {stream.is_free ? "FREE" : `$${stream.price}`}
                    </span>
                  </div>

                  {stream.is_free ? (
                    <Button
                      disabled
                      className="w-full bg-stone-100 text-stone-400 border border-stone-200 font-semibold h-11 rounded-xl"
                    >
                      Registration Free
                    </Button>
                  ) : purchased ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-center text-emerald-800 text-xs font-semibold">
                      Registered & Paid
                    </div>
                  ) : (
                    <Button
                      onClick={handlePurchase}
                      className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold h-11 rounded-xl cursor-pointer"
                    >
                      Reserve Pass
                    </Button>
                  )}
                  <p className="text-[10px] text-stone-400 text-center leading-normal">
                    Scheduled for {new Date(stream.scheduled_at).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Case 5: Stream is Ended & Paid / Free */}
              {stream.status === "ended" && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-500">This live class has ended. You can buy or watch the recording.</p>

                  {stream.is_free ? (
                    <Button
                      onClick={() => navigate(`/watch/${stream.uuid}`)}
                      className="w-full bg-brand hover:bg-brand-light text-white font-bold h-11 rounded-xl cursor-pointer shadow-lg shadow-brand/15"
                    >
                      🎥 Watch Recording (Free)
                    </Button>
                  ) : purchased ? (
                    <div className="space-y-3">
                      <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-center text-emerald-800 text-xs font-semibold">
                        Recording Unlocked
                      </div>
                      <Button
                        onClick={() => navigate(`/watch/${stream.uuid}`)}
                        className="w-full bg-brand hover:bg-brand-light text-white font-bold h-11 rounded-xl cursor-pointer shadow-lg shadow-brand/15"
                      >
                        🎥 Watch Recording
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline py-1 border-b border-stone-100">
                        <span className="text-stone-500 text-sm">Recording Price</span>
                        <span className="text-xl font-extrabold text-stone-900">
                          ${stream.recording_price || stream.price || "15.00"}
                        </span>
                      </div>
                      <Button
                        onClick={handlePurchase}
                        className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold h-11 rounded-xl cursor-pointer"
                      >
                        Buy Recording
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Case 6: Stream is Cancelled */}
              {stream.status === "cancelled" && (
                <div className="p-4 bg-stone-50 border border-stone-200 text-stone-500 rounded-xl text-center text-sm font-semibold">
                  ⚠️ This session was cancelled.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
