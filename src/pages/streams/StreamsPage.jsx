import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RiSearchLine, RiFilter2Line, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import StreamCard from "@/components/shared/StreamCard";

// Mock 8 streams matching the specified status distribution: 2 live, 3 scheduled, 3 ended
const MOCK_STREAMS = [
  {
    uuid: "live-stream-1",
    title: "Navakarana Yoga Vinyasa: Strength and Alignment",
    description: "An intensive live session focused on developing core stability, strength, and correct anatomical alignment. Perfect for intermediate practitioners looking to deepen their practice.",
    category: "Vinyasa",
    thumbnail_url: null,
    status: "live",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date(Date.now() - 3600000).toISOString(), // started 1 hour ago
    purchases_count: 42,
    teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
  },
  {
    uuid: "live-stream-2",
    title: "Pranayama & Breathwork Foundation",
    description: "Deep dive into breathwork techniques. Learn how to control energy flow, quiet the mind, and increase vital lung capacity through guided breath sequences.",
    category: "Pranayama",
    thumbnail_url: null,
    status: "live",
    is_free: false,
    price: "15.00",
    scheduled_at: new Date(Date.now() - 1800000).toISOString(), // started 30 mins ago
    purchases_count: 18,
    teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
  },
  {
    uuid: "scheduled-stream-1",
    title: "Hatha Flow for Flexibility & Relaxation",
    description: "A calming Hatha flow session to stretch out muscles, improve range of motion, and release daily accumulated tension.",
    category: "Hatha Flow",
    thumbnail_url: null,
    status: "scheduled",
    is_free: false,
    price: "12.50",
    scheduled_at: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    purchases_count: 9,
    teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
  },
  {
    uuid: "scheduled-stream-2",
    title: "Ashtanga Yoga Primary Series Introduction",
    description: "Introduction to the sequence and structure of Ashtanga primary series. Focus on Bandhas, Drishti, and Ujjayi breath.",
    category: "Ashtanga",
    thumbnail_url: null,
    status: "scheduled",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    purchases_count: 132,
    teacher: { uuid: "teacher-david", name: "David Swenson" }
  },
  {
    uuid: "scheduled-stream-3",
    title: "Morning Sun Salutations Intensive",
    description: "Start your day with high energy! 108 rounds of dynamic Sun Salutations to wake up the body and energize your soul.",
    category: "Vinyasa",
    thumbnail_url: null,
    status: "scheduled",
    is_free: false,
    price: "10.00",
    scheduled_at: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours from now
    purchases_count: 24,
    teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
  },
  {
    uuid: "ended-stream-1",
    title: "Yin Yoga: Deep Joint Opening & Mindfulness",
    description: "Recorded restorative session holding passive poses for longer periods to target connective tissues and cultivate mindfulness.",
    category: "Yin Yoga",
    thumbnail_url: null,
    status: "ended",
    is_free: false,
    price: "18.00",
    scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    purchases_count: 56,
    teacher: { uuid: "teacher-arjun", name: "Arjun Mehta" }
  },
  {
    uuid: "ended-stream-2",
    title: "Chakra Meditation for Inner Balance",
    description: "Guidance on focusing energy along the spine, clearing blockages, and aligning the 7 chakras for peace and clarity.",
    category: "Meditation",
    thumbnail_url: null,
    status: "ended",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    purchases_count: 245,
    teacher: { uuid: "teacher-david", name: "David Swenson" }
  },
  {
    uuid: "ended-stream-3",
    title: "Core Power Flow Masterclass",
    description: "A fast-paced core strengthening class combining yoga postures with calisthenics elements for high energy burn.",
    category: "Power Yoga",
    thumbnail_url: null,
    status: "ended",
    is_free: false,
    price: "20.00",
    scheduled_at: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    purchases_count: 89,
    teacher: { uuid: "teacher-sarah", name: "Sarah Connor" }
  }
];

export default function StreamsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'live' | 'scheduled' | 'ended' | 'free'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredStreams = useMemo(() => {
    return MOCK_STREAMS.filter((stream) => {
      // Search matches title or teacher name or category
      const matchesSearch =
        stream.title.toLowerCase().includes(search.toLowerCase()) ||
        stream.teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        stream.category.toLowerCase().includes(search.toLowerCase());

      // Filter matches status
      let matchesFilter = true;
      if (activeFilter === "live") {
        matchesFilter = stream.status === "live";
      } else if (activeFilter === "scheduled") {
        matchesFilter = stream.status === "scheduled";
      } else if (activeFilter === "ended") {
        matchesFilter = stream.status === "ended";
      } else if (activeFilter === "free") {
        matchesFilter = stream.is_free;
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  // Order of streams in browse: live -> scheduled -> ended
  const sortedStreams = useMemo(() => {
    const statusOrder = { live: 0, scheduled: 1, ended: 2 };
    return [...filteredStreams].sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }, [filteredStreams]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedStreams.length / itemsPerPage));
  const paginatedStreams = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedStreams.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedStreams, currentPage, itemsPerPage]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset page to 1 on filter
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-stone-200/60 pb-6">
        <div>
          <span className="text-brand font-bold text-xs uppercase tracking-widest">Explore Classes</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 mt-1">Live & Recorded Yoga Sessions</h1>
          <p className="text-stone-500 mt-2">Browse the directory of guided classes, breathwork sessions, and meditation practices hosted by expert instructors.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 size-4" />
          <Input
            type="text"
            placeholder="Search class or instructor..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 py-2 bg-white border-stone-200 rounded-xl h-10 w-full shadow-sm text-stone-700 placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <span className="text-stone-500 text-xs font-semibold uppercase flex items-center gap-1 shrink-0 mr-2">
          <RiFilter2Line /> Filters:
        </span>
        {[
          { id: "all", label: "All Classes" },
          { id: "live", label: "🔴 Live Now" },
          { id: "scheduled", label: "📅 Scheduled" },
          { id: "ended", label: "🎥 Ended & Recordings" },
          { id: "free", label: "🎁 Free Classes" }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${activeFilter === filter.id
                ? "bg-stone-900 border-stone-900 text-white shadow-sm"
                : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      {paginatedStreams.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedStreams.map((stream) => (
            <motion.div
              layout
              key={stream.uuid}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StreamCard stream={stream} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-white border border-stone-100 rounded-3xl p-16 text-center shadow-sm">
          <div className="text-stone-300 text-5xl mb-4">🤷</div>
          <h3 className="text-lg font-bold text-stone-800">No classes found</h3>
          <p className="text-stone-400 text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-stone-200/60 mt-10 pt-6">
          <p className="text-xs text-stone-500">
            Showing <span className="font-semibold text-stone-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-stone-800">
              {Math.min(currentPage * itemsPerPage, sortedStreams.length)}
            </span>{" "}
            of <span className="font-semibold text-stone-800">{sortedStreams.length}</span> results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer text-stone-600"
            >
              <RiArrowLeftSLine className="size-4" />
            </button>
            <span className="text-xs font-semibold text-stone-700 px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer text-stone-600"
            >
              <RiArrowRightSLine className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
