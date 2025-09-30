import { Link, useOutletContext } from "react-router";
import { useEffect, useRef, useState } from "react";

import StatusCard from "@/components/status-card.tsx";
import SearchBox from "@/components/header/search-box.tsx";
import PropertyCard, {
  PropertySkeleton,
} from "@/components/admin/admin-property-card.tsx";

import type { ParamsType, BaseProperty, AdminContext } from "@/types.ts";
import { fetchJSON, watchElementIntersecting } from "@/helper.ts";
import Popup from "@/components/popup";
import usePaginatedFetch from "@/hooks/use-paginated-fetch";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const MainAdminPage = () => {
  const { authToken } = useOutletContext<AdminContext>();
  const [searchFilter, setSearchFilter] = useState<ParamsType>({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading, retry, hasEnded, mutateData } =
    usePaginatedFetch<BaseProperty>(
      backendURL + "/api/v1/property/",
      pageNumber,
      searchFilter
    );
  const [deleteError, setDeleteError] = useState<{
    code?: number;
    message?: string;
  }>({});
  const intersectingElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = watchElementIntersecting(
      intersectingElement.current,
      () => {
        if (isLoading || hasEnded) return;
        setPageNumber((currentPageNumber) => currentPageNumber++);
      }
    );
    return () => observer?.disconnect();
  }, [isLoading, hasEnded]);

  const handleDelete = (id: number) => {
    void fetchJSON({
      url: `${backendURL}/api/v1/property/${String(id)}/`,
      headers: { Authorization: `Bearer ${authToken}` },
      method: "DELETE",
      onSuccess: () => {
        mutateData((fetchedProperties) => {
          return fetchedProperties.filter((property) => property.id !== id);
        });
      },
      onError: (status, error) => {
        if (status === 400) {
          const errorobject = JSON.parse(error) as { detail: string };
          setDeleteError({ code: status, message: errorobject.detail });
          return;
        }
        setDeleteError({ code: status });
      },
    });
  };

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
      <main className="p-4">
        <div className="flex flex-col md:grid grid-cols-2 gap-x-4 gap-8">
          {data.map((property, index) => (
            <PropertyCard
              key={property.id}
              {...property}
              ref={data.length - 5 === index ? intersectingElement : undefined}
              onDelete={() => {
                handleDelete(property.id);
              }}
            />
          ))}
          {isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <PropertySkeleton key={number} />
            ))}
        </div>

        {error && error.status > 299 && (
          <StatusCard status={error.status} onRetry={retry} withRetry />
        )}
        {deleteError.code && (
          <Popup
            open={Boolean(deleteError)}
            onClose={() => {
              setDeleteError({});
            }}
          >
            <div className="flex flex-col gap-4">
              <StatusCard
                status={deleteError.code}
                message={deleteError.message}
              />
            </div>
          </Popup>
        )}
      </main>
    </>
  );
};

export default MainAdminPage;
