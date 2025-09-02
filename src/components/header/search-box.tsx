import { type Dispatch, type SetStateAction, useState } from "react";
import { Search, Settings2 } from "lucide-react";
import { type ParamsType } from "../../types.ts";
import { motion, type TargetAndTransition } from "motion/react";

interface Props {
    setSearchFilter: Dispatch<setStateAction<ParamsType>>;
}

const SearchBox = ({ setSearchFilter }: Props) => {
    const [filter, setFilter] = useState<ParamsType>({});
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            animate={{ width: isOpen ? 270 : null } as TargetAndTransition}
            data-isopen={isOpen}
            className="group flex items-center gap-2 rounded-full bg-slate-100"
        >
            <button onClick={() => setIsOpen(true)} className="p-2">
                <Search size={isOpen ? "18" : "24"} />
            </button>
            <input
                placeholder="search for property"
                className="outline-0 w-4/5 group-data-[isopen=false]:hidden"
            />
            <button
                onClick={() => setIsOpen(false)}
                className="group-data-[isopen=false]:hidden text-sm"
            >
                X
            </button>
            <button
                type="button"
                className="bg-black text-white p-2 rounded-full group-data-[isopen=false]:hidden"
            >
                <Settings2 />
            </button>
        </motion.div>
    );
};

export default SearchBox;
