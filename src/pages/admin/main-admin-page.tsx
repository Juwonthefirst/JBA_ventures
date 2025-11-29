import { Link, useOutletContext } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/api-client";

import StatusCard from "@/components/status-card.tsx";
import SearchBox from "@/components/header/search-box.tsx";
import PropertyCard, {
  PropertySkeleton,
} from "@/components/admin/admin-property-card.tsx";
import type { ParamsType, AdminContext } from "@/types.ts";
import { watchElementIntersecting } from "@/utils";
import Popup from "@/components/popup";
import { propertyQueryOption } from "@/queryOptions";
import NoProperty from "@/components/no-property-card";

const MainAdminPage = () => {
  const { authToken } = useOutletContext<AdminContext>();
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

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      api.delete<string>(`/property/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    onSuccess: (_, varaibles, onMutateResult, context) => {
      void onMutateResult;
      void context.client.invalidateQueries({ queryKey: ["properties"] });

      void context.client.invalidateQueries({
        queryKey: ["property", varaibles.id],
      });
    },

    onError(error) {
      void error;
    },
  });
  const intersectingElement = useRef<HTMLDivElement | null>(null);
  const PAGE_SIZE = 20;
  const LIMIT = 5;

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
      <header className="flex py-2 px-4 fixed top-0 left-0 z-10 items-center justify-end w-full bg-white gap-4 dark:bg-black dark:text-white">
        <SearchBox expandTo={250} setSearchFilter={setSearchFilter} />
        <Link
          to="/admin/add"
          className="h-fit px-2 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black"
        >
          Add +
        </Link>
      </header>
      <h1 className="text-2xl font-semibold p-2 pt-16 dark:text-white">
        Properties
      </h1>
      <main className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:grid grid-cols-2 gap-x-4 gap-8">
          {status === "success" && data.pages[0].results.length === 0 && (
            <NoProperty />
          )}
          {status === "success" &&
            data.pages.flatMap((response, currentPageParamIndex) =>
              response.results.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  ref={
                    data.pageParams.length * PAGE_SIZE - LIMIT ===
                    currentPageParamIndex * PAGE_SIZE + index
                      ? intersectingElement
                      : undefined
                  }
                  onDelete={() => {
                    mutation.mutate({ id: String(property.id) });
                  }}
                />
              ))
            )}

          {(status === "pending" || isFetchingNextPage) &&
            Array.from({ length: 10 }).map((_, index) => (
              <PropertySkeleton key={"key" + String(index)} />
            ))}
        </div>
        {status === "error" && axios.isAxiosError(error) && (
          <StatusCard
            className="sm:col-span-2 lg:col-span-3"
            status={error.response?.status || 600}
            onRetry={() => void refetch()}
            withRetry
          />
        )}
        {mutation.isError &&
          axios.isAxiosError<{ detail: string }>(mutation.error) && (
            <Popup
              open={mutation.isError}
              onClose={() => {
                mutation.reset();
              }}
            >
              <div className="flex flex-col gap-4">
                <StatusCard
                  status={mutation.error.response?.status || 600}
                  message={
                    mutation.error.response?.status === 400
                      ? mutation.error.response.data.detail
                      : undefined
                  }
                />
              </div>
            </Popup>
          )}
      </main>
    </>
  );
};

export default MainAdminPage;
