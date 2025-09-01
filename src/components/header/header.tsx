import { useState, type Dispatch, type SetStateAction } from "react";
import SearchBox from "./search-box.tsx";
import { type ParamsType } from "../../types.ts";
import { Menu } from "lucide-react";
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

interface Props {
    setSearchFilter: Dispatch<SetStateAction<ParamsType>>;
}

const Header = ({ setSearchFilter }: Props) => {
    return (
        <header className="flex p-2 px-4 absolute top-0 left-0 items-center justify-end w-full bg-white rounded-b-3xl">
            <div className="flex gap-4 items-center">
                <SearchBox setSearchFilter={setSearchFilter} />
                {/*<button className="p-2 bg-slate-100 rounded-full">
                    <Menu />
                </button>
                */}
            </div>
        </header>
    );
};

export default Header;
