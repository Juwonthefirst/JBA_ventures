import { useState, useRef } from "react";
import PropertyCard, { PropertySkeleton } from "@/components/property-card.tsx";
import Header from "@/components/header/header.tsx";
import type {
  ParamsType,
  BaseProperty,
  PaginatedBasePropertyResponse,
} from "@/types.ts";
import useCachedFetch from "@/hooks/use-cached-fetch.ts";
import StatusCard from "@/components/status-card.tsx";

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
      <Header setSearchFilter={setSearchFilter} />

      <main className="flex flex-col p-4 py-16 md:px-16 gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-10">
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
      </main>
    </>
  );
};

export default MainPage;
