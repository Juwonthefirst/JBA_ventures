import { useParams } from "react-router";
import { MapPin } from "lucide-react";
import TagList from "@/components/tag-list.tsx";
import Skeleton from "@/components/property-page-skeleton.tsx";
import useCachedFetch from "@/hooks/use-cached-fetch.ts";
import { type Property } from "@/types.ts";
import ErrorCard from "@/components/error-card.tsx";
import NotFoundPage from "./404-page.tsx";
const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const PropertyPage = () => {
    const { id } = useParams();
    const { isLoading, error, data, retry } = useCachedFetch<Property>(
        `${backendURL}/api/v1/property/${id}`
    );

    if (isLoading) {
        return <Skeleton />;
    } else if (error?.status === 404) return <NotFoundPage />;
    else if (error) return <ErrorCard status={error.status} onRetry={retry} />;

    if (data)
        return (
            <div className="flex flex-col md:flex-row md:gap-4 md:items-center dark:text-white">
                <img
                    src={data.main_image}
                    className="h-72 md:h-80 object-cover rounded-b-xl mb-4 md:w-2/3"
                />

                <div className="flex flex-col gap-3 p-4 pt-0">
                    <h2 className="text-2xl ">₦{data.price}</h2>
                    <div className="flex gap-1 text-sm items-center opacity-80">
                        <MapPin size="16" className="min-h-4 min-w-4" />
                        <p>{`${data.address}, ${data.lga}, ${data.state}`}</p>
                    </div>
                    <TagList tags={data.tags} />
                    <div className="mt-4">
                        <h2 className="text-lg font-medium">Description:</h2>
                        <p className="leading-relaxed text-sm">
                            {data.description}
                        </p>
                        <h2 className="text-lg mt-6 font-medium">
                            This property includes:
                        </h2>
                        <ul className="list-disc list-inside text-sm space-y-1 p-2">
                            {data.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
};

export default PropertyPage;
