import { type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog.tsx";

interface Props {
  className?: string;
  open?: boolean;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}

const Popup = ({ open, children, onChange, className = "" }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onChange}>
      <AlertDialogContent className="w-3/4 border-white/30 bg-white dark:bg-black">
        <AlertDialogDescription className={"p-0 h-fit w-fit" + className}>
          {children}
        </AlertDialogDescription>
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
