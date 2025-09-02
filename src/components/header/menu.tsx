import {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MenuPanel = () => {
    return (
        <Sheet>
            <SheetTrigger className="p-2 bg-slate-100 rounded-full">
                <Menu />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-2 p-2">
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
            </SheetContent>
        </Sheet>
    );
};

export default MenuPanel;
