import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiVideoLine, RiAddLine, RiEditLine, RiDeleteBin7Line,
  RiBroadcastLine, RiCloseLine, RiCameraLine, RiMicLine,
  RiLockLine, RiLockUnlockLine, RiCalendarTodoLine, RiStopCircleLine,
  RiLiveLine,
  RiDraftLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import DeleteConfirmModal from "@/components/shared/DeleteConfirmModal";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiVideoRecording } from "react-icons/bi";
import { TbCancel } from "react-icons/tb";

const INITIAL_STREAMS = [
  {
    uuid: "live-stream-1",
    title: "Navakarana Yoga Vinyasa: Strength and Alignment",
    description: "An intensive live session focused on developing core stability.",
    category: "Vinyasa",
    thumbnail_url: "",
    status: "live",
    is_free: true,
    price: "0.00",
    scheduled_at: new Date(Date.now() - 3600000).toISOString().substring(0, 16)
  },
  {
    uuid: "scheduled-stream-1",
    title: "Hatha Flow for Flexibility & Relaxation",
    description: "A calming Hatha flow session to stretch out muscles.",
    category: "Hatha Flow",
    thumbnail_url: "",
    status: "scheduled",
    is_free: false,
    price: "12.50",
    scheduled_at: new Date(Date.now() + 172800000).toISOString().substring(0, 16)
  },
  {
    uuid: "ended-stream-1",
    title: "Yin Yoga: Deep Joint Opening & Mindfulness",
    description: "Recorded restorative session holding passive poses.",
    category: "Yin Yoga",
    thumbnail_url: "",
    status: "ended",
    is_free: false,
    price: "18.00",
    scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString().substring(0, 16)
  },
  {
    uuid: "draft-stream-1",
    title: "Chakra Alignment Basics: Theory and Practice",
    description: "Introductory session to chakra visualization methods.",
    category: "Meditation",
    thumbnail_url: "",
    status: "draft",
    is_free: true,
    price: "0.00",
    scheduled_at: ""
  }
];

export default function TeacherStreamsPage() {
  const [searchParams] = useSearchParams();
  const [streams, setStreams] = useState(INITIAL_STREAMS);

  // Modals state
  const [formOpen, setFormOpen] = useState(false);
  const [editingStream, setEditingStream] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUuid, setDeletingUuid] = useState("");

  const [goLiveOpen, setGoLiveOpen] = useState(false);
  const [activeLiveStream, setActiveLiveStream] = useState(null);
  const [liveInitialized, setLiveInitialized] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const [formError, setFormError] = useState("");

  // Check URL query parameters to auto-open creation dialog (e.g. ?create=true)
  useEffect(() => {
    if (searchParams.get("create") === "true") {
      handleOpenCreate();
    }
  }, [searchParams]);

  const handleOpenCreate = () => {
    setEditingStream(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setThumbnailUrl("");
    setIsFree(true);
    setPrice("");
    setScheduledAt("");
    setFormError("");
    setFormOpen(true);
  };

  const handleOpenEdit = (stream) => {
    setEditingStream(stream);
    setTitle(stream.title);
    setDescription(stream.description || "");
    setCategory(stream.category || "");
    setThumbnailUrl(stream.thumbnail_url || "");
    setIsFree(stream.is_free);
    setPrice(stream.price || "");
    setScheduledAt(stream.scheduled_at || "");
    setFormError("");
    setFormOpen(true);
  };

  const handleSaveStream = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }

    const priceVal = isFree ? "0.00" : parseFloat(price || 0).toFixed(2);

    if (editingStream) {
      // Modify
      setStreams((prev) =>
        prev.map((s) =>
          s.uuid === editingStream.uuid
            ? {
              ...s,
              title,
              description,
              category,
              thumbnail_url: thumbnailUrl,
              is_free: isFree,
              price: priceVal,
              scheduled_at: scheduledAt
            }
            : s
        )
      );
    } else {
      // Create
      const newStream = {
        uuid: `stream-${Math.random().toString(36).substr(2, 9)}`,
        title,
        description,
        category,
        thumbnail_url: thumbnailUrl,
        status: scheduledAt ? "scheduled" : "draft",
        is_free: isFree,
        price: priceVal,
        scheduled_at: scheduledAt
      };
      setStreams((prev) => [newStream, ...prev]);
    }
    setFormOpen(false);
  };

  const handleOpenDelete = (uuid) => {
    setDeletingUuid(uuid);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    setStreams((prev) => prev.filter((s) => s.uuid !== deletingUuid));
    setDeleteOpen(false);
  };

  const handleCancelScheduled = (uuid) => {
    if (confirm("Are you sure you want to cancel this scheduled stream?")) {
      setStreams((prev) =>
        prev.map((s) => (s.uuid === uuid ? { ...s, status: "cancelled" } : s))
      );
    }
  };

  const handleOpenGoLive = (stream) => {
    setActiveLiveStream(stream);
    setLiveInitialized(false);
    setGoLiveOpen(true);
  };

  const handleInitializeLive = () => {
    setLiveInitialized(true);
    // Simulate updating stream status to 'live' in database
    setStreams((prev) =>
      prev.map((s) =>
        s.uuid === activeLiveStream.uuid ? { ...s, status: "live" } : s
      )
    );
  };

  const handleEndLive = () => {
    setStreams((prev) =>
      prev.map((s) =>
        s.uuid === activeLiveStream.uuid ? { ...s, status: "ended" } : s
      )
    );
    setGoLiveOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 flex items-center gap-2">
            <RiVideoLine /> My Classes
          </h1>
          <p className="text-stone-500 text-xs mt-1">Configure classes, manage scheduled dates, and broadcast live sessions.</p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-brand hover:bg-brand-light text-white font-bold h-10 px-4 rounded-xl gap-1.5 cursor-pointer shadow-lg shadow-brand/15 self-start sm:self-auto"
        >
          <RiAddLine /> Create New Class
        </Button>
      </div>

      {/* Stream List Table */}
      <div className="bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 font-bold border-b border-stone-100">
                <th className="p-4">Title / Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Admission</th>
                <th className="p-4">Scheduled Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {streams.map((stream) => (
                <tr key={stream.uuid} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 max-w-xs md:max-w-sm">
                    <div className="space-y-0.5">
                      <p className="font-bold text-stone-850 truncate">{stream.title}</p>
                      <span className="text-[10px] text-stone-400 font-semibold uppercase">{stream.category || "General"}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {stream.status === "live" && (
                      <Badge className="bg-red-100 text-red-700 border-red-200 rounded-md font-bold px-2 py-0.5 animate-pulse">
                        <RiLiveLine className="w-3 h-3 mr-1" />
                         LIVE NOW
                      </Badge>
                    )}
                    {stream.status === "scheduled" && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-md font-bold px-2 py-0.5">
                        <FaRegCalendarAlt className="w-3 h-3 mr-1" />
                         UPCOMING
                      </Badge>
                    )}
                    {stream.status === "ended" && (
                      <Badge className="bg-stone-100 text-stone-600 border-stone-200 rounded-md font-bold px-2 py-0.5">
                        <BiVideoRecording className="w-3 h-3 mr-1" />
                         ENDED
                      </Badge>
                    )}
                    {stream.status === "draft" && (
                      <Badge className="bg-stone-100 text-stone-500 border-stone-200 rounded-md font-semibold px-2 py-0.5">
                        <RiDraftLine className="w-3 h-3 mr-1" />
                        DRAFT
                      </Badge>
                    )}
                    {stream.status === "cancelled" && (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 rounded-md font-bold px-2 py-0.5">
                        <TbCancel className="w-3 h-3 mr-1" />
                         CANCELLED
                      </Badge>
                    )}
                  </td>
                  <td className="p-4 font-semibold">
                    {stream.is_free ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      <span className="text-stone-800">${stream.price}</span>
                    )}
                  </td>
                  <td className="p-4 text-stone-500 font-medium">
                    {stream.scheduled_at
                      ? new Date(stream.scheduled_at).toLocaleString()
                      : "—"}
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    {/* Go Live button */}
                    {(stream.status === "scheduled" || stream.status === "draft") && (
                      <Button
                        onClick={() => handleOpenGoLive(stream)}
                        className="bg-brand hover:bg-brand-light text-white font-bold size-7 rounded-lg cursor-pointer"
                        title="Teach Live"
                        size="icon"
                      >
                        <RiBroadcastLine />
                      </Button>
                    )}

                    {/* Edit button */}
                    <Button
                      onClick={() => handleOpenEdit(stream)}
                      variant="outline"
                      className="border-stone-200 hover:bg-stone-50 text-stone-600 size-7 rounded-lg cursor-pointer"
                      title="Edit details"
                      size="icon"
                    >
                      <RiEditLine />
                    </Button>

                    {/* Cancel Scheduled button */}
                    {stream.status === "scheduled" && (
                      <Button
                        onClick={() => handleCancelScheduled(stream.uuid)}
                        variant="outline"
                        className="border-amber-200 hover:bg-amber-50 text-amber-600 size-7 rounded-lg cursor-pointer"
                        title="Cancel Schedule"
                        size="icon"
                      >
                        <RiCloseLine />
                      </Button>
                    )}

                    {/* Delete button */}
                    <Button
                      onClick={() => handleOpenDelete(stream.uuid)}
                      variant="destructive"
                      className="size-7 rounded-lg cursor-pointer"
                      title="Delete class"
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

      {/* Create / Edit Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-3xl border border-stone-100 shadow-xl text-stone-900">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingStream ? "Edit Class Details" : "Create New Yoga Class"}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-400 mt-1">
              Provide the class details, schedules, and fee rates for the class.
            </DialogDescription>
          </DialogHeader>

          {formError && <p className="text-brand text-xs font-semibold">{formError}</p>}

          <form onSubmit={handleSaveStream} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-stone-700 font-semibold text-xs">Class Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Intermediate Hatha alignment flow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-stone-700 font-semibold text-xs">Description</Label>
              <Textarea
                id="desc"
                placeholder="Curriculum syllabus breakdown..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-stone-50 border-stone-200 focus:bg-white rounded-xl min-h-20 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-stone-700 font-semibold text-xs">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g. Vinyasa"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="thumbnail" className="text-stone-700 font-semibold text-xs">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="https://image.com/mat.jpg"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Price section toggle */}
            <div className="space-y-2 border-t border-stone-100 pt-3">
              <div className="flex items-center justify-between">
                <Label className="text-stone-750 font-semibold text-xs flex items-center gap-1.5">
                  {isFree ? <RiLockUnlockLine className="text-emerald-600" /> : <RiLockLine className="text-brand" />}
                  Class Access Cost
                </Label>
                <div className="flex gap-2 bg-stone-100 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setIsFree(true)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${isFree ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                      }`}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFree(false)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${!isFree ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                      }`}
                  >
                    Paid
                  </button>
                </div>
              </div>

              {!isFree && (
                <div className="space-y-1.5">
                  <Label htmlFor="price" className="text-stone-700 font-semibold text-xs">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    max="9999.99"
                    placeholder="e.g. 15.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5 border-t border-stone-100 pt-3">
              <Label htmlFor="scheduled" className="text-stone-750 font-semibold text-xs flex items-center gap-1.5">
                <RiCalendarTodoLine className="text-stone-500" /> Date & Time (Optional)
              </Label>
              <Input
                id="scheduled"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="h-10 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-xs text-stone-700"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFormOpen(false)}
                className="hover:bg-stone-50 font-semibold rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand hover:bg-brand-light text-white font-bold rounded-xl text-xs cursor-pointer px-4"
              >
                Save Session
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Yoga Class"
        description="Are you absolutely sure you want to delete this class? Students who purchased access will lose their video playback. This action is permanent."
      />

      {/* Go Live Streaming Modal */}
      <Dialog open={goLiveOpen} onOpenChange={setGoLiveOpen}>
        <DialogContent className="max-w-md bg-stone-950 p-6 rounded-3xl border border-stone-900 shadow-2xl text-stone-100">
          <DialogHeader>
            <DialogTitle className="text-stone-250 font-extrabold text-base flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${liveInitialized ? "bg-red-600 animate-pulse" : "bg-stone-500"}`} />
              {liveInitialized ? "Broadcasting Yoga Class" : "Initialize Live Class"}
            </DialogTitle>
            <DialogDescription className="text-stone-550 text-xs">
              {activeLiveStream?.title}
            </DialogDescription>
          </DialogHeader>

          {/* Simulated Web Camera Area */}
          <div className="aspect-video w-full rounded-2xl bg-black border border-stone-900 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            {liveInitialized ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2 z-10"
              >
                <div className="size-12 bg-red-600/10 border border-red-900/50 rounded-2xl flex items-center justify-center text-red-500 mx-auto text-xl animate-pulse">
                  <RiBroadcastLine />
                </div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest">TRANSMISSION ACTIVE</p>
                <p className="text-[10px] text-stone-500">Camera & audio source feeding correctly.</p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-center gap-3 text-stone-700 text-2xl">
                  <RiCameraLine />
                  <RiMicLine />
                </div>
                <p className="text-xs font-bold text-stone-400">Class Connection Offline</p>
                <p className="text-[10px] text-stone-600">Ensure microphone and video permissions are enabled.</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-row gap-2 justify-end pt-3">
            {liveInitialized ? (
              <Button
                onClick={handleEndLive}
                className="bg-red-600 hover:bg-red-750 text-white font-bold rounded-xl text-xs gap-1.5 cursor-pointer px-4"
              >
                <RiStopCircleLine /> End Class
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => setGoLiveOpen(false)}
                  variant="ghost"
                  className="hover:bg-stone-900 text-stone-400 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInitializeLive}
                  className="bg-brand hover:bg-brand-light text-white font-bold rounded-xl text-xs gap-1.5 cursor-pointer px-4"
                >
                  <RiBroadcastLine /> Go Live
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
