import { useState, type Dispatch, type SetStateAction } from "react";
import { Map } from "lucide-react";
import SearchBox from "./search-box.tsx";
import { type ParamsType } from "@/types.ts";
import MenuPanel from "./menu.tsx";

interface Props {
    setSearchFilter: Dispatch<SetStateAction<ParamsType>>;
}

const Header = ({ setSearchFilter }: Props) => {
    return (
        <header className="flex py-2 px-4 fixed top-0 left-0 z-10 items-center justify-end w-full bg-white rounded-b-2xl /shadow">
            <div className="flex gap-4 items-center">
                <SearchBox setSearchFilter={setSearchFilter} />
                <button className="p-2 bg-slate-100 rounded-full">
                    <Map />
                </button>
            </div>
        </header>
    );
};

export default Header;
