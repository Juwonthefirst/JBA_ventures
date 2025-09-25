import { useState, useEffect, useRef } from "react";
import { Search, Settings2 } from "lucide-react";
import lgaJson from "@/assets/data/lgas.json";
import PropertyCard, {
  PropertySkeleton,
} from "@/components/home/property-card";
import type { ParamsType, BaseProperty } from "@/types.ts";
import usePaginatedFetch from "@/hooks/use-paginated-fetch";
import SelectInput from "@/components/form/select-input";
import StatusCard from "@/components/status-card.tsx";
import lagosImg from "@/assets/images/lagos.jpg";
import { propertyTypes, watchElementIntersecting } from "@/helper";
import { motion } from "motion/react";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const MainPage = () => {
  const [searchFilter, setSearchFilter] = useState<ParamsType>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading, retry, hasEnded } =
    usePaginatedFetch<BaseProperty>(
      backendURL + "/api/v1/property/",
      pageNumber,
      searchFilter
    );
  const intersectingElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = watchElementIntersecting(
      intersectingElement.current,
      () => {
        console.log("intersecting");
        if (isLoading || hasEnded) return;
        setPageNumber((currentPageNumber) => currentPageNumber++);
      }
    );
    return () => observer?.disconnect();
  }, [isLoading, hasEnded]);

  return (
    <>
      <main className="py-16 px-4 /dark:bg-zinc-900">
        <section className="relative flex w-full shadow-lg rounded-xl overflow-hidden">
          <img
            src={lagosImg}
            className="w-full h-72 md:h-84 lg:h-96 object-cover "
          />
          <div className="absolute top-0 left-0 flex w-full h-full bg-black/40 items-center justify-center flex-col gap-6 text-white text-center px-4">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl md:w-1/2 lg:mt-4">
              Your reliable partner in the world of real estate
            </h2>
          </div>
        </section>
        <section className="group **:text-black dark:**:text-white sticky top-2 z-10 mx-auto -mt-24 mb-36 flex  justify-center items-center p-2 gap-2 caret-accent outline outline-white/20 rounded-xl bg-slate-200 dark:bg-zinc-700 has-focus:outline-accent has-focus:outline-2 transition-all text-sm md:text-base w-2/3 lg:w-fit">
          <Search size="18" className="group-has-focus:*:text-accent" />
          <input
            name="search-input"
            placeholder="Search for properties"
            className="focus:outline-0 w-2/3 lg:w-fit placeholder:italic placeholder:opacity-90"
            value={searchFilter.search || ""}
            onChange={(event) => {
              setSearchFilter((searchFilter) => ({
                ...searchFilter,
                search: event.target.value,
              }));
            }}
          />
          <motion.button
            type="button"
            className="hover:*:text-accent hover:*:scale-110"
            animate={{
              rotate: menuOpen ? 90 : undefined,
              color: menuOpen ? "var(--color-green-500)" : undefined,
            }}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <Settings2 />
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

        <section className="flex flex-col gap-20 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 px-6 md:px-16">
          {data.map((property, index) => (
            <PropertyCard
              key={property.id}
              {...property}
              ref={data.length - 5 === index ? intersectingElement : undefined}
            />
          ))}

          {isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((element) => (
              <PropertySkeleton key={element} />
            ))}

          {error && (
            <StatusCard status={error.status} onRetry={retry} withRetry />
          )}
        </section>
      </main>
    </>
  );
};

export default MainPage;
