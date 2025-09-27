import { useParams } from "react-router";
import { MapPin } from "lucide-react";
import TagList, { TagListSkeleton } from "@/components/home/tag-list.tsx";
import useCachedFetch from "@/hooks/use-cached-fetch.ts";
import { type Property } from "@/types.ts";
import StatusCard from "@/components/status-card.tsx";
import NotFoundPage from "./404-page.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const PropertyPageSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
      <Skeleton className="h-72 md:h-full mb-4 md:w-2/5" />
      <div className="flex flex-col gap-3 p-4 pt-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6" />
        <TagListSkeleton />
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />

          <Skeleton className="h-6 w-1/2 mt-6" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      </div>
    </div>
  );
};

const PropertyPage = () => {
  const { id } = useParams();
  const { isLoading, error, data, retry } = useCachedFetch<Property>(
    `${backendURL}/api/v1/property/${String(id)}`
  );

  if (isLoading) {
    return <PropertyPageSkeleton />;
  } else if (error?.status === 404) return <NotFoundPage />;
  else if (error)
    return <StatusCard status={error.status} onRetry={retry} withRetry />;

  if (data)
    return (
      <div className="flex flex-col md:flex-row md:gap-4 md:items-center dark:text-white md:h-screen md:p-4">
        <img
          src={data.main_image}
          className="h-72 md:h-full object-cover rounded-xl mb-4 md:w-2/5 "
        />

        <div className="flex flex-col gap-4 p-4 pt-0 md:mt-4 overflow-y-auto md:h-full">
          <h2 className="text-2xl ">₦{data.price}</h2>
          <div className="flex gap-1 text-sm items-center opacity-80">
            <MapPin size="16" className="min-h-4 min-w-4" />
            <p>{`${data.address}, ${data.lga}, ${data.state}`}</p>
          </div>
          <TagList tags={data.tags} />
          <div className="mt-8">
            <h2 className="text-lg font-medium">Description:</h2>
            <p className="leading-relaxed text-sm">{data.description}</p>
            <h2 className="text-base mt-6 font-medium">
              This property includes:
            </h2>
            <ul className="list-disc list-inside text-sm space-y-1 p-2">
              {data.benefits.map((benefit, index) => (
                <li key={benefit + String(index)}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
};

export default PropertyPage;
