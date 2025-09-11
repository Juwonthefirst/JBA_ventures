import { Link, useOutletContext } from "react-router";
import { useState, useRef } from "react";
import { motion } from "motion/react";

import SearchBox from "@/components/header/search-box.tsx";
import PropertyCard, {
    PropertySkeleton
} from "@/components/admin/admin-property-card.tsx";
import useCachedFetch from "@/hooks/use-cached-fetch.ts";
import type {
    ParamsType,
    PaginatedBasePropertyResponse,
    BaseProperty,
    AdminContext
} from "@/types.ts";
import { fetchJSON } from "@/helper.ts";

const backendURL = import.meta.env.VITE_BACKEND_URL<string>;

const MainAdminPage = () => {
    const { authToken } = useOutletContext<AdminContext>();
    const [version, setVersion] = useState(0);
    const [searchFilter, setSearchFilter] = useState<ParamsType>({});
    const { data, error, isLoading, clearCache } =
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

    if (error) return <p>{error}</p>;

    const handleDelete = (id: number, state: string) => {
        fetchJSON({
            url: `${backendURL}/api/v1/property/${String(id)}`,
            headers: { Authorization: authToken },
            method: "DELETE",
            onSuccess: () => {
                clearCache();
                delete fetchedDataRef.current[state + String(id)];
                setVersion((version) => version + 1);
            }
        }).catch()
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
            <motion.main layout className="flex flex-col p-4 gap-8">
                {isLoading
                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                          <PropertySkeleton key={number} />
                      ))
                    : Object.values(fetchedDataRef.current).map(
                          (property: BaseProperty) => (
                              <PropertyCard
                                  key={property.id}
                                  {...property}
                                  onDelete={() => {
                                      handleDelete(property.id, property.state);
                                  }}
                              />
                          )
                      )}
            </motion.main>
        </>
    );
};

export default MainAdminPage;
