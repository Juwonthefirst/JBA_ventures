import { useState } from "react";
import PropertyCard from "../components/property-card.tsx";
import Header from "../components/header/header.tsx";

const MainPage = () => {
    const [searchFilter, setSearchFilter] = useState({});
    return (
        <>
            <Header setSearchFilter={setSearchFilter} />
            <main className="flex flex-col p-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-10">
                {/*<PropertyCard
					imgUrl={"/test.jpg"}
					title={
						"Hello, my name is juwon, jsjdkdjdndidnjdkdjdjdidjdidjdjodjsi"
					}
					price={6000}
					id={1}
				/>
				<PropertyCard
					imgUrl={"/test.jpg"}
					title={
						"Hello, my name is juwon, jsjdkdjdndidnjdkdjdjdidjdidjdjodjsi"
					}
					price={6000}
					id={1}
				/>
				*/}
            </main>
        </>
    );
};

export default MainPage;
