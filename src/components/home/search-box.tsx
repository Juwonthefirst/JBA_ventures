import { propertyOffers, propertyTypes } from "@/helper";
import { Search, Settings2 } from "lucide-react";
import { motion } from "motion/react";
import SelectInput from "../form/select-input";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import lgaJson from "@/assets/data/lgas.json";
import type { ParamsType } from "@/types";

interface Props {
  className: string;
  searchFilter: ParamsType;
  setSearchFilter: Dispatch<SetStateAction<ParamsType>>;
}

const SearchBox = ({ className, searchFilter, setSearchFilter }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const selectStyling = "max-h-7 **:text-xs";

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setSearchFilter((searchFilter) => ({
        ...searchFilter,
        search: inputValue.trim(),
      }));
    }, 300);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [inputValue, setSearchFilter]);

  return (
    <section className={className}>
      <Search size="18" className="group-has-focus:*:text-accent" />
      <input
        name="search-input"
        placeholder="Search for properties"
        className="focus:outline-0 w-2/3 lg:w-fit placeholder:italic placeholder:opacity-90 text-sm sm:text-base"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <motion.button
        type="button"
        className="-m-2 p-1.5 rounded-md hover:bg-black/40 active:bg-black/60 transition-colors"
        animate={{
          rotate: menuOpen ? 90 : undefined,
        }}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <Settings2 className="group-has-focus:*:text-accent" />
      </motion.button>
      {menuOpen && (
        <div className="absolute -bottom-26 -right-18 z-20 text-black bg-white shadow-md dark:bg-black dark:text-white py-2 px-4 transition-all rounded-md border dark:border-white/20 border-black/80">
          <div className=" w-full grid grid-cols-2 gap-x-3 gap-y-2">
            <SelectInput
              placeholder="L.G.A"
              className={selectStyling}
              options={lgaJson.Lagos}
              required={false}
              value={searchFilter.lga || ""}
              onChange={(newValue) => {
                setSearchFilter({ ...searchFilter, lga: newValue });
              }}
            />
            <SelectInput
              placeholder="Type"
              className={selectStyling}
              options={propertyTypes}
              required={false}
              value={searchFilter.type || ""}
              onChange={(newValue) => {
                setSearchFilter({ ...searchFilter, type: newValue });
              }}
            />
            <SelectInput
              placeholder="Offer"
              className={selectStyling}
              options={propertyOffers}
              required={false}
              value={searchFilter.offer || ""}
              onChange={(newValue) => {
                setSearchFilter({ ...searchFilter, offer: newValue });
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchBox;
