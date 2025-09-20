import { type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";

interface Props {
  className: string;
  onConfirm: () => void;
  children: ReactNode;
}

const DeleteConfirmationPopup = ({ onConfirm, children, className }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-3/4 bg-white p-4 rounded-xl dark:text-white dark:bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Property</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="opacity-70 mt-[-4px]">
          Are you sure you want to delete this property
        </AlertDialogDescription>
        <div className="flex gap-4 *:grow mt-3">
          <AlertDialogCancel className="bg-black text-white active:bg-white active:text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500/20 text-red-500"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationPopup;
