import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Spinner} from "@/components/ui/Spinner";

export default function DeleteConfirmModal({ open, onClose, onConfirm, title = "Are you sure?", description = "This action cannot be undone.", confirmLabel = "Delete", loading = false }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-stone-900">{title}</DialogTitle>
          <DialogDescription className="text-stone-500">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 mt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl" disabled={loading}>Cancel</Button>
          <Button onClick={onConfirm} disabled={loading} className="rounded-xl bg-brand text-white hover:bg-brand-light">
            {/* {loading ? "Deleting…" : confirmLabel} */}
            {loading ? <Spinner /> : <Trash2 className="w-4 h-4 mr-2" />} {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
