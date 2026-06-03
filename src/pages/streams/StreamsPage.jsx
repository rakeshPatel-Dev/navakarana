import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RiSearchLine, RiFilter2Line, RiArrowLeftSLine, RiArrowRightSLine, RiLiveLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import StreamCard from "@/components/shared/StreamCard";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiVideoRecording } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { MOCK_STREAMS } from "./data/streams";
import { EmptyContent, Empty, EmptyHeader, EmptyMedia, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { CiStreamOff } from "react-icons/ci";


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
    <div className="bg-background min-h-screen py-30 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border/60 pb-6">
        <div>
          <span className="text-brand font-bold text-xs uppercase tracking-widest">Explore Streams</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mt-1">Live & Recorded Yoga Sessions</h1>
          <p className="text-muted-foreground mt-2">Browse the directory of guided stream, breathwork sessions, and meditation practices hosted by expert instructors.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
          <Input
            type="text"
            placeholder="Search stream or instructor..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <span className="text-muted-foreground text-xs font-semibold uppercase flex items-center gap-1 shrink-0 mr-2">
          <RiFilter2Line /> Filters:
        </span>
        {[
          { id: "all", label: "All Streams" },
          { id: "live", label: "Live Now", icon: <RiLiveLine /> },
          { id: "scheduled", label: "Scheduled", icon: <FaRegCalendarAlt /> },
          { id: "ended", label: "Ended & Recordings", icon: <BiVideoRecording /> },
          { id: "free", label: "Free Streams", icon: <GoGift /> }
        ].map((filter) => (
          <Button
            key={filter.id}
            variant="outline"
            onClick={() => handleFilterChange(filter.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 border ${activeFilter === filter.id
              ? "bg-brand border-foreground text-white shadow-sm"
              : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-border"
              }`}
          >
            {filter.icon}
            {filter.label}
          </Button>
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
        <Empty className=" border-dashed border border-muted-foreground rounded-3xl py-16 mt-10">
          <EmptyHeader>
            <EmptyMedia>
              <CiStreamOff className="size-12 text-muted-foreground mx-auto" stroke="50" />
            </EmptyMedia>
            <EmptyTitle>No Streams found</EmptyTitle>
            <EmptyDescription>Try adjusting your filters or search term.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={() => { setSearch(""); setActiveFilter("all"); }} className="mt-6">
              Clear Filters
            </Button>
          </EmptyContent>
        </Empty>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/60 mt-10 pt-6">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * itemsPerPage, sortedStreams.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{sortedStreams.length}</span> results
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded-xl bg-background hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer text-muted-foreground"
            >
              <RiArrowLeftSLine className="size-4" />
            </Button>
            <span className="text-xs font-semibold text-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded-xl bg-background hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer text-muted-foreground"
            >
              <RiArrowRightSLine className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
