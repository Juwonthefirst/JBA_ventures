import { Link } from "react-router";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
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
    imgUrl,
    price,
    id,
    title,
    state,
    lga
}: BaseProperty) => {
    return (
        <article className="flex flex-col gap-2 transition-all dark:text-white">
            <img
                className="rounded-lg h-72 object-cover w-full hover:scale-110 hover:shadow"
                src={imgUrl}
            />
            <Link to={"/" + String(id)} className="flex flex-col gap-2">
                <h2 className="text-xl font-medium line-clamp-1">{title}</h2>
                <div className="flex gap-1.5 text-sm items-center opacity-80">
                    <MapPin size="14" />
                    <p>{lga + ", " + state}</p>
                </div>
                <TagList />
            </Link>
            <div className="flex justify-between items-center text-⁰ mt-4">
                <p className="text-2xl font-medium ">₦{price}</p>
                <button
                    type="button"
                    className="border-2 px-2 py-1.5 rounded-xl hidden"
                >
                    Contact us
                </button>
            </div>
        </article>
    );
};

export default PropertyCard;
