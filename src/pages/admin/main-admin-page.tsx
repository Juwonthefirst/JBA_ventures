import { Link } from "react-router";
import SearchBox from "@/components/header/search-box.tsx";
import PropertyCard, {
    PropertySkeleton
} from "@/components/admin/admin-property-card.tsx";
import { useState, useEffect } from "react";

const MainAdminPage = () => {
    const [loaded, setloaded] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setloaded(true);
        }, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <header className="flex py-2 px-4 fixed top-0 left-0 z-10 items-center justify-end w-full bg-white gap-4 dark:bg-black dark:text-white">
                <SearchBox expandTo={250} />
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
            <main className="flex flex-col p-4 gap-8">
                {[1, 2, 3, 4, 5, 6].map((element, index) =>
                    loaded ? (
                        <PropertyCard key={element} />
                    ) : (
                        <PropertySkeleton />
                    )
                )}
            </main>
        </>
    );
};

export default MainAdminPage;
