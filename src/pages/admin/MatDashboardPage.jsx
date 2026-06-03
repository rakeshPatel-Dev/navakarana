import { useState } from "react";
// import { motion } from "framer-motion";
import {
  RiShoppingBag3Line, RiDownloadLine, RiChatQuoteLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { toast } from "sonner";

const INITIAL_ORDERS = [
  { uuid: "mat-order-a2d9b4c7", customerName: "Jane Doe", status: "pending", createdAt: "2026-05-31T09:15:00Z", note: "Customer requested thin line borders.", measurements: "fm1: 42cm | fm5: 175cm" },
  { uuid: "mat-order-18c7e4a9", customerName: "Lucas Vance", status: "shipped", createdAt: "2026-05-24T14:22:00Z", note: "", measurements: "fm1: 39cm | fm5: 164cm" },
  { uuid: "mat-order-f5a6b7d2", customerName: "Maria Garcia", status: "completed", createdAt: "2026-05-10T11:05:00Z", note: "Gift order wrapping.", measurements: "fm1: 45cm | fm5: 182cm" },
  { uuid: "mat-order-4c9f7a8b", customerName: "David Chen", status: "in_progress", createdAt: "2026-05-28T16:45:00Z", note: "", measurements: "fm1: 40cm | fm5: 170cm" },
  { uuid: "mat-order-9b2e1c3a", customerName: "Emma Watson", status: "pending", createdAt: "2026-05-29T12:00:00Z", note: "Wants custom font engraving.", measurements: "fm1: 38cm | fm5: 160cm" }
];

export default function MatDashboardPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Note dialog state
  const [noteOpen, setNoteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [noteText, setNoteText] = useState("");

  const handleStatusChange = (uuid, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.uuid === uuid ? { ...ord, status: newStatus } : ord))
    );
  };

  const handleOpenNote = (order) => {
    setSelectedOrder(order);
    setNoteText(order.note || "");
    setNoteOpen(true);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    setOrders((prev) =>
      prev.map((ord) =>
        ord.uuid === selectedOrder.uuid ? { ...ord, note: noteText } : ord
      )
    );
    setNoteOpen(false);
  };

  const handleDownloadSVG = (uuid) => {
    toast.info("Sorry for the inconvenience!", {
      description: `Mat order ${uuid} is currently not available for download.`,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return ({
          name: "Pending",
          className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-transparent font-bold"
        })
      case "in_progress":
        return ({
          name: "In Production",
          className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-transparent font-bold"
        });
      case "shipped":
        return ({
          name: "Shipped",
          className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-transparent font-bold"
        });
      case "completed":
        return ({
          name: "Completed",
          className: "bg-green-500/10 text-green-600 dark:text-green-400 border-transparent font-bold"
        });
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
            <RiShoppingBag3Line /> Mat Order Management
          </h1>
          <p className="text-muted-foreground text-xs mt-1">Review custom yoga mat orders, update assembly states, view blueprints, and append notes.</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-background border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-background text-muted-foreground font-bold border-b border-border">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Anatomical Specs</th>
                <th className="p-4">State Details</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((ord) => (
                <tr key={ord.uuid} className="hover:bg-background/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-muted-foreground">{ord.uuid.substring(10)}</td>
                  <td className="p-4 font-bold text-foreground">{ord.customerName}</td>
                  <td className="p-4 font-mono text-muted-foreground">{ord.measurements}</td>
                  <td className="p-4">

                    <Select onValueChange={(value) => handleStatusChange(ord.uuid, value)}>
                      {/* use cn and getStatusBadge(ord.status).className */}
                      <SelectTrigger className={` bg-background text-xs px-2 py-1 rounded-lg outline-none font-semibold transition-all focus:bg-background ${getStatusBadge(ord.status).className}`}>
                        <SelectValue placeholder={getStatusBadge(ord.status).name} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup >
                          <SelectItem value="pending">
                            Pending
                          </SelectItem>
                          <SelectItem value="in_progress">
                            In Production
                          </SelectItem>
                          <SelectItem value="shipped" >
                            Shipped
                          </SelectItem>
                          <SelectItem value="completed" >
                            Completed
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 max-w-xs truncate">
                    {ord.note ? (
                      <span className="text-muted-foreground font-medium">{ord.note}</span>
                    ) : (
                      <span className="text-muted-foreground font-normal italic">No note added</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground font-medium">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    {/* Add note */}
                    <Button
                      onClick={() => handleOpenNote(ord)}
                      variant="outline"
                      className="border-border hover:bg-background text-foreground size-7 rounded-lg cursor-pointer"
                      title="Update notes"
                      size="icon"
                    >
                      <RiChatQuoteLine />
                    </Button>

                    {/* Download SVG */}
                    <Button
                      onClick={() => handleDownloadSVG(ord.uuid)}
                      variant="outline"
                      className="border-border hover:bg-background text-foreground size-7 rounded-lg cursor-pointer"
                      title="Download blueprint Vector"
                      size="icon"
                    >
                      <RiDownloadLine />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note dialog */}
      <Dialog open={noteOpen} onOpenChange={setNoteOpen}>
        <DialogContent className="max-w-sm bg-background p-6 rounded-3xl border border-border text-foreground shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Edit Order Note</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Append special assembly logs or customer request details here.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveNote} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="note" className="text-foreground font-semibold text-xs">Note details</Label>
              <Textarea
                id="note"
                placeholder="Write custom instructions..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="bg-background border-border focus:bg-background rounded-xl text-xs min-h-22"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setNoteOpen(false)}
                className="hover:bg-background rounded-xl font-semibold text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-card hover:bg-card text-foreground font-bold rounded-xl text-xs cursor-pointer px-4"
              >
                Save Note
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
