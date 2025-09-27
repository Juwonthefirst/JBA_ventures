import { propertyTypes } from "@/helper";
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

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setSearchFilter((searchFilter) => ({
        ...searchFilter,
        search: inputValue.trim(),
      }));
    }, 500);
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
        className="focus:outline-0 w-2/3 lg:w-fit placeholder:italic placeholder:opacity-90"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <motion.button
        type="button"
        className=" hover:*:scale-110"
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
        <div className="absolute -bottom-24 -right-18 z-20 grid grid-cols-2 gap-x-4 text-black bg-white shadow-md dark:bg-black dark:text-white p-6 transition-all rounded-md">
          <SelectInput
            placeholder="L.G.A"
            className=""
            options={lgaJson.Lagos}
            required={false}
            value={searchFilter.lga}
            onChange={(newValue) => {
              setSearchFilter({ ...searchFilter, lga: newValue });
            }}
          />

          <SelectInput
            placeholder="Type"
            className=""
            options={propertyTypes}
            required={false}
            value={searchFilter.type}
            onChange={(newValue) => {
              setSearchFilter({ ...searchFilter, type: newValue });
            }}
          />
        </div>
      )}
    </section>
  );
};

export default SearchBox;
