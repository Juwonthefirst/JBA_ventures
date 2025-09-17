import { Link, useOutletContext } from "react-router";
import { useState, useRef } from "react";
import { motion } from "motion/react";

import StatusCard from "@/components/status-card.tsx";
import SearchBox from "@/components/header/search-box.tsx";
import PropertyCard, {
    PropertySkeleton
} from "@/components/admin/admin-property-card.tsx";
import useCachedFetch, { clearCache } from "@/hooks/use-cached-fetch.ts";

import type {
    ParamsType,
    PaginatedBasePropertyResponse,
    BaseProperty,
    AdminContext
} from "@/types.ts";
import { fetchJSON } from "@/helper.ts";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const MainAdminPage = () => {
    const { authToken } = useOutletContext<AdminContext>();
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

    const handleDelete = (id: number, state: string) => {
        fetchJSON({
            url: `${backendURL}/api/v1/property/${String(id)}`,
            headers: { Authorization: authToken },
            method: "DELETE",
            onSuccess: () => {
                clearCache();
                const key = state + String(id);
                delete fetchedDataRef.current[key];
                setSearchFilter((searchFilter) => ({ ...searchFilter }));
            }
        }).catch((error: unknown) => {
            console.error(error);
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
            <motion.main layout className="flex flex-col p-4 gap-8">
                {Object.values(fetchedDataRef.current).map(
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

                {isLoading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <PropertySkeleton key={number} />
                    ))}
                {error && (
                    <StatusCard
                        status={error.status}
                        onRetry={retry}
                        withRetry
                    />
                )}
            </motion.main>
        </>
    );
};

export default MainAdminPage;
