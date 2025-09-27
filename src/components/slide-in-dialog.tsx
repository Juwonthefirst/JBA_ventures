import { X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
  menuBtn?: ReactNode;
  onClose: () => void;
}

const SlideInDialog = ({ open, onClose, children, menuBtn }: Props) => {
  const menuDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const menuDialog = menuDialogRef.current;
    if (!menuDialog) return;

    if (open && !menuDialog.open) menuDialog.showModal();
    else if (!open && menuDialog.open) menuDialog.close();
  }, [open]);
  return (
    <motion.dialog
      ref={menuDialogRef}
      initial={{ x: 1200 }}
      animate={{ x: 0 }}
      className="h-screen flex flex-col gap-4 justify-self-end w-54 bg-white text-black dark:bg-black dark:text-white shadow-xl p-4"
    >
      <div className="flex gap-3 items-center justify-end">
        <button type="button" className="" onClick={onClose}>
          {menuBtn}
          <X />
        </button>
      </div>
      {children}
    </motion.dialog>
  );
};

export default SlideInDialog;
