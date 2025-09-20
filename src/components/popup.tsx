import { type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog.tsx";

interface Props {
  open?: boolean;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}

const Popup = ({ open, children, onChange }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onChange}>
      <AlertDialogContent className="w-3/4 border-white/30 bg-white dark:bg-black">
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel
            asChild
            className="dark:bg-white dark:text-black font-medium"
          >
            <button type="button">Close</button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Popup;
