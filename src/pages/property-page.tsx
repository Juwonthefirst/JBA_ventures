import { Link, useParams } from "react-router";
import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import TagList, { TagListSkeleton } from "@/components/home/tag-list.tsx";
import StatusCard from "@/components/status-card.tsx";
import NotFoundPage from "./404-page.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import MediaCarousel from "@/components/home/media-carousel.tsx";
import { propertyIdQueryOPtion } from "@/queryOptions.ts";
import axios from "axios";

const PropertyPageSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:h-screen lg:p-4">
      <Skeleton className="h-72 lg:h-full mb-4 lg:w-2/5 w-full" />
      <div className="flex flex-col gap-4 p-4 pt-0 lg:mt-4 lg:h-full w-full lg:w-1/3">
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

  const { data, error, status, refetch } = useQuery(
    propertyIdQueryOPtion(String(id))
  );

  if (status === "pending") {
    return <PropertyPageSkeleton />;
  } else if (status === "error")
    return axios.isAxiosError(error) && error.response?.status === 404 ? (
      <NotFoundPage />
    ) : (
      <StatusCard
        status={axios.isAxiosError(error) ? error.response?.status || 600 : 600}
        onRetry={() => {
          void refetch();
        }}
        withRetry
      />
    );

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:h-screen lg:p-4 dark:text-white">
      <MediaCarousel
        urls={[
          data.main_image,
          ...data.extra_media.map((media) => media.media),
        ]}
      />

      <div className="flex flex-col gap-4 p-4 pt-0 lg:mt-4 overflow-y-auto lg:h-full">
        <h2 className="text-2xl">₦{data.price}</h2>
        <div className="flex gap-1 text-sm items-center opacity-80">
          <MapPin size="16" className="min-h-4 min-w-4" />
          <p>{`${data.address}, ${data.lga}, ${data.state}`}</p>
        </div>
        <TagList tags={data.tags} />
        <Link
          to={String(import.meta.env.VITE_WHATSAPP_LINK)}
          className="border-2 border-accent [&:hover,&:active]:bg-accent [&:hover,&:active]:text-white text-sm text-accent px-2 py-1 rounded-md w-fit transition-all"
        >
          Contact Agent
        </Link>
        <div className="mt-6">
          <h2 className="text-lg font-medium">Description:</h2>
          <p className="leading-relaxed text-sm opacity-85 ml-2">
            {data.description}
          </p>
          <h2 className="text-lg mt-6 font-medium">This property includes:</h2>
          <ul className="list-disc list-inside text-sm space-y-1 p-2 *:opacity-85">
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
