import { Skeleton } from "@/components/ui/skeleton.tsx";
import { TagListSkeleton } from "@/components/home/tag-list";

const PropertyPageSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
      <Skeleton className="h-72 md:w-80 mb-4 md:w-2/3" />
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

export default PropertyPageSkeleton;
