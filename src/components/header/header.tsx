import { type Dispatch, type SetStateAction } from "react";
import { Map } from "lucide-react";
import SearchBox from "./search-box.tsx";
import { type ParamsType } from "@/types.ts";

interface Props {
    setSearchFilter: Dispatch<SetStateAction<ParamsType>>;
}

const Header = ({ setSearchFilter }: Props) => {
    return (
        <header className="flex py-2 px-4 fixed top-0 left-0 z-10 items-center justify-end w-full bg-white rounded-b-2xl /shadow">
            <div className="flex gap-4 items-center">
                <SearchBox setSearchFilter={setSearchFilter} />
                <button className="transition-all duration-200 p-2 bg-slate-100 rounded-full active:bg-black active:text-white">
                    <Map />
                </button>
            </div>
        </header>
    );
};

export default Header;
