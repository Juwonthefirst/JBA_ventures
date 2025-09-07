import { useState, useEffect } from "react";
import PropertyCard, { PropertySkeleton } from "@/components/property-card.tsx";
import Header from "@/components/header/header.tsx";
import { type ParamsType } from "@/types.ts";

const MainPage = () => {
    const [searchFilter, setSearchFilter] = useState<ParamsType>({});
    const [loaded, setloaded] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setloaded(true);
        }, 5000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <Header setSearchFilter={setSearchFilter} />
            <main className="flex flex-col p-4 py-16 gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-10">
                {[1, 2, 3, 4, 5, 6].map((element, index) =>
                    loaded ? (
                        <PropertyCard
                            key={element}
                            imgUrl={"/test.jpg"}
                            title={
                                "3 Bedroom flat with boys quarters and a fully furnished toilet"
                            }
                            state={"Lagos"}
                            lga={"Ikorodu"}
                            price={6000}
                            id={element}
                        />
                    ) : (
                        <PropertySkeleton />
                    )
                )}
            </main>
        </>
    );
};

export default MainPage;
