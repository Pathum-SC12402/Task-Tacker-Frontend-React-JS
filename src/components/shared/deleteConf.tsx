import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DeleteConfirmation({ onConfirm, open, setOpen }: DeleteConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Confirm Deletion
          </DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
