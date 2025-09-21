import { Link } from "react-router";
import { MapPin } from "lucide-react";
import { type BaseProperty } from "@/types.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import TagList, { TagListSkeleton } from "@/components/tag-list.tsx";

export const PropertySkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-5 w-1/2" />
      <TagListSkeleton />
      <Skeleton className="w-1/3 h-10 mt-4" />
    </div>
  );
};

const PropertyCard = ({
  main_image,
  price,
  id,
  offer,
  tags,
  description,
  state,
  lga,
}: BaseProperty) => {
  return (
    <article className="flex flex-col gap-2 transition-all dark:text-white md:max-h-1/2 hover:scale-110">
      <img
        className="rounded-lg h-64 md:h-52  object-cover w-full hover:shadow"
        src={main_image}
      />
      <Link to={"/" + String(id)} className="flex flex-col gap-3">
        <h2 className="text-xl font-medium line-clamp-1">{description}</h2>
        <div className="flex gap-1.5 text-sm items-center opacity-80">
          <MapPin size="14" />
          <p>{lga + ", " + state}</p>
        </div>
        <TagList tags={tags} />
      </Link>
      <div className="flex justify-between items-center text-⁰ mt-4">
        <p className="text-2xl font-medium ">₦{price}</p>
      </div>
    </article>
  );
};

export default PropertyCard;
