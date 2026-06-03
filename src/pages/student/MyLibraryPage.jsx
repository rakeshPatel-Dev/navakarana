import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiPlayCircleLine, RiFolderVideoLine, RiBookOpenLine, RiReceiptLine, RiLiveLine, RiSearchLine, RiFilter2Line } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiVideoRecording } from "react-icons/bi";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CiStreamOff } from "react-icons/ci";

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

  // filter mock purchases on the basis of status and implement search functionality

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'live' | 'scheduled' | 'ended'

  const filteredPurchases = useMemo(() => {
    return MOCK_PURCHASES.filter((purchase) => {
      // Filter by status
      let matchesStatus = true;
      if (activeFilter === "live") {
        matchesStatus = purchase.status === "live";
      } else if (activeFilter === "scheduled") {
        matchesStatus = purchase.status === "scheduled";
      } else if (activeFilter === "ended") {
        matchesStatus = purchase.status === "ended";
      }

      // Filter by search query (matches title or teacher name)
      const matchesSearch =
        purchase.title.toLowerCase().includes(search.toLowerCase()) ||
        purchase.teacherName.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [search, activeFilter]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="bg-background min-h-screen py-30 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="border-b border-border/60 pb-5 flex items-center justify-between">
          <div>
            <span className="text-brand font-bold text-xs uppercase tracking-widest">My Account</span>
            <h1 className="text-3xl font-extrabold text-foreground mt-1 flex items-center gap-2">
              <RiBookOpenLine /> My Learning Library
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Access your purchased live classes, class recordings, and upcoming sessions.</p>
          </div>


          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
            <Input
              type="text"
              placeholder="Search stream by title or instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          ].map((filter) => (
            <Button
              key={filter.id}
              variant="outline"
              onClick={() => handleFilter(filter.id)}
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

        {filteredPurchases.length > 0 ? (
          <div className="space-y-4">
            {filteredPurchases.map((item) => {
              const showWatchButton = item.status === "live" || item.status === "ended";

              return (
                <motion.div
                  key={item.uuid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-background border border-border rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:shadow-md hover:border-border/50"
                >
                  <div className="flex items-start md:items-center gap-4">
                    {/* Icon/Thumbnail area */}
                    <div className="size-16 rounded-2xl bg-linear-to-tr from-muted to-muted/50 flex items-center justify-center shrink-0 border border-border/40 text-muted-foreground">
                      <RiFolderVideoLine className="size-8" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-border text-muted-foreground rounded-md font-semibold text-[10px]"
                        >
                          {item.purchaseType}
                        </Badge>
                        {item.status === "live" && (
                          <Badge className="bg-red-600 hover:bg-red-700 text-white border-transparent text-[10px] font-bold tracking-wider animate-pulse">
                            <RiLiveLine />
                            LIVE NOW
                          </Badge>
                        )}
                        {item.status === "scheduled" && (
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-transparent text-[10px] font-bold">
                            <FaRegCalendarAlt />
                            SCHEDULED
                          </Badge>
                        )}
                        {item.status === "ended" && (
                          <Badge className="bg-accent hover:bg-accent text-foreground border-transparent text-[10px] font-bold">
                            <BiVideoRecording />
                            RECORDING
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-extrabold text-foreground text-base md:text-lg leading-snug">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
                        <span>Instructor: <span className="font-semibold text-foreground">{item.teacherName}</span></span>
                        <span className="hidden sm:inline text-muted-foreground">•</span>
                        <span className="flex items-center gap-1">
                          <RiReceiptLine /> Paid: <span className="font-semibold text-foreground">${item.amountPaid}</span>
                        </span>
                        <span className="hidden sm:inline text-muted-foreground">•</span>
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
                        className="w-full md:w-auto border-border hover:bg-background text-muted-foreground font-bold h-10 px-5 rounded-xl cursor-pointer"
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
      </div>
    </div>
  );
}
