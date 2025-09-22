import { useState, useRef } from "react";
import PropertyCard, {
  PropertySkeleton,
} from "@/components/home/property-card";

import type {
  ParamsType,
  BaseProperty,
  PaginatedBasePropertyResponse,
} from "@/types.ts";
import useCachedFetch from "@/hooks/use-cached-fetch.ts";
import StatusCard from "@/components/status-card.tsx";
import lagosImg from "@/assets/images/lagos.jpg";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const MainPage = () => {
  const [searchFilter, setSearchFilter] = useState<ParamsType>({});
  const { data, error, isLoading, retry } =
    useCachedFetch<PaginatedBasePropertyResponse>(
      backendURL + "/api/v1/property/",
      searchFilter
    );
  const fetchedDataRef = useRef<{ [key: string]: BaseProperty }>({});
  if (data) {
    data.results.forEach((property) => {
      const key = property.state + String(property.id);
      fetchedDataRef.current[key] = property;
    });
  }

  return (
    <>
      <main className="flex flex-col gap-28 py-16 px-4">
        <section className="relative flex h-80 md:h-96 w-full overflow-hidden shadow-lg rounded-xl">
          <img
            src={lagosImg}
            className="absolute -z-10 w-full h-full object-cover "
          />
          <div className="absolute top-0 left-0 flex w-full h-full bg-black/40 items-center justify-center flex-col gap-4 text-white text-center px-4">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl md:w-1/2">
              Your reliable partner in the world of real estate
            </h2>
          </div>
        </section>

        <section className="flex flex-col gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 px-6 md:px-16">
          {Object.values(fetchedDataRef.current).map((property) => (
            <PropertyCard key={property.id} {...property} />
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
