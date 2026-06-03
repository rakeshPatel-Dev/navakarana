import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  RiVideoLine, RiSearchLine, RiEyeLine, 
  RiDeleteBin7Line, RiCalendarTodoLine, RiBroadcastLine 
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import DeleteConfirmModal from "@/components/shared/DeleteConfirmModal";

const MOCK_STREAMS = [
  { uuid: "live-stream-1", title: "Navakarana Yoga Vinyasa: Strength and Alignment", teacherName: "Arjun Mehta", category: "Vinyasa", status: "live", is_free: true, price: "0.00", createdAt: "2026-05-31T05:00:00Z" },
  { uuid: "live-stream-2", title: "Pranayama & Breathwork Foundation", teacherName: "Sarah Connor", category: "Pranayama", status: "live", is_free: false, price: "15.00", createdAt: "2026-05-31T06:30:00Z" },
  { uuid: "scheduled-stream-1", title: "Hatha Flow for Flexibility & Relaxation", teacherName: "Arjun Mehta", category: "Hatha Flow", status: "scheduled", is_free: false, price: "12.50", createdAt: "2026-05-30T10:00:00Z" },
  { uuid: "scheduled-stream-2", title: "Ashtanga Yoga Primary Series Introduction", teacherName: "David Swenson", category: "Ashtanga", status: "scheduled", is_free: true, price: "0.00", createdAt: "2026-05-30T12:00:00Z" },
  { uuid: "ended-stream-1", title: "Yin Yoga: Deep Joint Opening & Mindfulness", teacherName: "Arjun Mehta", category: "Yin Yoga", status: "ended", is_free: false, price: "18.00", createdAt: "2026-05-28T08:00:00Z" },
  { uuid: "ended-stream-2", title: "Chakra Meditation for Inner Balance", teacherName: "David Swenson", category: "Meditation", status: "ended", is_free: true, price: "0.00", createdAt: "2026-05-25T14:30:00Z" }
];

export default function AdminStreamsPage() {
  const [streams, setStreams] = useState(MOCK_STREAMS);
  const [search, setSearch] = useState("");
  
  const [selectedStream, setSelectedStream] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUuid, setDeletingUuid] = useState("");

  // Search Filter
  const filteredStreams = useMemo(() => {
    return streams.filter(
      (s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.teacherName.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [streams, search]);

  const handleOpenDelete = (uuid) => {
    setDeletingUuid(uuid);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setStreams((prev) => prev.filter((s) => s.uuid !== deletingUuid));
    setDeleteOpen(false);
  };

  const handleViewDetail = (stream) => {
    setSelectedStream(stream);
    setDetailOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 font-bold rounded-md px-2 py-0.5">LIVE</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-bold rounded-md px-2 py-0.5">SCHEDULED</Badge>;
      case "ended":
        return <Badge className="bg-muted text-muted-foreground border-border font-bold rounded-md px-2 py-0.5">ENDED</Badge>;
      case "cancelled":
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-bold rounded-md px-2 py-0.5">CANCELLED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2">
            <RiVideoLine /> Global Streams
          </h1>
          <p className="text-muted-foreground text-xs mt-1">Monitor active transmissions, verify class details, and delete stream archives globally.</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-72">
        <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
        <Input
          placeholder="Search by title, teacher, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-background text-muted-foreground font-bold border-b border-border">
                <th className="p-4">Stream Title</th>
                <th className="p-4">Teacher</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStreams.map((stream) => (
                <tr key={stream.uuid} className="hover:bg-background/50 transition-colors">
                  <td className="p-4 font-bold text-foreground max-w-xs truncate">{stream.title}</td>
                  <td className="p-4 font-semibold text-foreground">{stream.teacherName}</td>
                  <td className="p-4 font-semibold text-muted-foreground uppercase text-[10px]">{stream.category}</td>
                  <td className="p-4">{getStatusBadge(stream.status)}</td>
                  <td className="p-4 font-semibold">
                    {stream.is_free ? (
                      <span className="text-green-600 dark:text-green-400">FREE</span>
                    ) : (
                      <span className="text-foreground">${stream.price}</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground font-medium">
                    {new Date(stream.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    {/* View Details */}
                    <Button
                      onClick={() => handleViewDetail(stream)}
                      variant="outline"
                      className="border-border hover:bg-background text-foreground size-7 rounded-lg cursor-pointer"
                      title="Inspect Metadata"
                      size="icon"
                    >
                      <RiEyeLine />
                    </Button>

                    {/* Delete */}
                    <Button
                      onClick={() => handleOpenDelete(stream.uuid)}
                      variant="destructive"
                      className="size-7 rounded-lg cursor-pointer"
                      title="Delete stream"
                      size="icon"
                    >
                      <RiDeleteBin7Line />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stream metadata inspector modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-sm bg-background p-6 rounded-3xl border border-border text-foreground shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Stream Metadata Details</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Inspection parameters for the requested streaming entry.
            </DialogDescription>
          </DialogHeader>

          {selectedStream && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="bg-background border border-border p-4 rounded-2xl space-y-3 font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stream UUID:</span>
                  <span className="text-foreground font-mono">{selectedStream.uuid}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="text-foreground font-bold leading-normal">{selectedStream.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span className="text-foreground font-bold">{selectedStream.teacherName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-muted-foreground font-bold uppercase text-[10px]">{selectedStream.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{getStatusBadge(selectedStream.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stream Cost:</span>
                  <span className="font-bold">{selectedStream.is_free ? "FREE" : `$${selectedStream.price}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created Date:</span>
                  <span className="text-muted-foreground">{new Date(selectedStream.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  onClick={() => setDetailOpen(false)}
                  variant="ghost"
                  className="w-full h-10 hover:bg-background rounded-xl font-semibold text-muted-foreground text-xs"
                >
                  Close Inspector
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* DeleteConfirmModal */}
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Stream Record"
        description="Are you absolutely sure? This will remove the stream metadata, associated playback links, and logs from the system globally. Students will lose access."
      />
    </div>
  );
}
