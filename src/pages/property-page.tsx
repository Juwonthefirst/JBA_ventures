import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import TagList from "@/components/tag-list.tsx";
import Skeleton from "@/components/property-page-skeleton.tsx";

const PropertyPage = () => {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timeoutKey = setTimeout(() => {
            setLoaded(true);
        }, 3000);
        return () => {
            clearTimeout(timeoutKey);
        };
    }, []);

    if (!loaded) {
        return <Skeleton />;
    }
    return (
        <div className="flex flex-col md:flex-row md:gap-4 md:items-center dark:text-white">
            <img
                src={"/test.jpg"}
                className="h-72 md:h-80 object-cover rounded-b-xl mb-4 md:w-2/3"
            />
            {
                <div className="flex flex-col gap-3 p-4 pt-0">
                    <h2 className="text-2xl ">₦6,000,000</h2>
                    <div className="flex gap-1 text-sm items-center opacity-80">
                        <MapPin size="16" className="min-h-4 min-w-4" />
                        <p>4 Adefenwa Street, Itamaga, Ikorodu, Lagos,</p>
                    </div>
                    <TagList />
                    <div className="mt-4">
                        <h2 className="text-lg font-medium">Description:</h2>
                        <p className="leading-relaxed text-sm">
                            gkxgxgxgkxfkfkfk zdgxkxtdt xtoxxtdot xglgxx otxtkzkg
                            todzltxlg xgkxkt cfkmgxg kxktclg lgxktdoy cotxkgxkt
                            xotkxgg kodtoyd oxyxoy
                        </p>
                        <h2 className="text-lg mt-6 font-medium">
                            This property includes:{" "}
                        </h2>
                        <ul className="list-disc list-inside text-sm space-y-1 p-2">
                            <li>24 hours electricity</li>
                            <li>quiet environment</li>
                            <li>Swimming pool</li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default PropertyPage;
