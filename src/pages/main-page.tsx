import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import PropertyCard, {
  PropertySkeleton,
} from "@/components/home/property-card";
import Search from "@/components/home/search-box";
import type { ParamsType } from "@/types.ts";
import StatusCard from "@/components/status-card.tsx";
import lagosImg from "/images/lagos.jpg";

import { watchElementIntersecting } from "@/helper";
import { propertyQueryOption } from "@/queryOptions";
import axios from "axios";

const MainPage = () => {
  const [searchFilter, setSearchFilter] = useState<ParamsType>({ search: "" });
  const {
    data,
    error,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(propertyQueryOption(searchFilter));
  const intersectingElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isFetchingNextPage || !hasNextPage || status === "pending") return;

    const observer = watchElementIntersecting(
      intersectingElement.current,
      () => {
        void fetchNextPage();
      }
    );
    return () => observer?.disconnect();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, status]);

  return (
    <>
      <main className="py-16 px-4">
        <section className="relative flex w-full shadow-lg rounded-xl overflow-hidden">
          <img
            src={lagosImg}
            className="w-full h-72 md:h-84 lg:h-96 object-cover"
          />
          <div className="absolute top-0 left-0 flex w-full h-full bg-black/40 items-center justify-center flex-col gap-6 text-white text-center px-4">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl md:w-1/2 lg:mt-4">
              Your reliable partner in the world of real estate
            </h2>
          </div>
        </section>
        <Search
          className="group text-black dark:text-white sticky top-2 z-10 mx-auto -mt-24 mb-36 flex  justify-center items-center p-2 gap-2 caret-accent outline outline-white/20 rounded-xl bg-slate-200 dark:bg-zinc-900 has-focus:outline-accent has-focus:outline-2 has-focus:not-dark:bg-slate-100 transition-all text-sm md:text-base w-2/3 sm:w-fit"
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <section className="flex flex-col gap-20 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 px-4 md:px-16 w-full">
          {status === "success" &&
            data.pages.flatMap((response) =>
              response.results.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  ref={
                    data.pageParams.length - 5 === index
                      ? intersectingElement
                      : undefined
                  }
                />
              ))
            )}

          {(status === "pending" || isFetchingNextPage) &&
            Array.from({ length: 10 }).map((_, index) => (
              <PropertySkeleton key={"key" + String(index)} />
            ))}

          {status === "error" && (
            <StatusCard
              className="sm:col-span-2 lg:col-span-3"
              status={
                axios.isAxiosError(error) ? error.response?.status || 600 : 600
              }
              onRetry={() => void refetch()}
              withRetry
            />
          )}
        </section>
      </main>
    </>
  );
};

export default MainPage;
