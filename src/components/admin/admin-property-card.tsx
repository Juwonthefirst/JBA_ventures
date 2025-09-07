import { EllipsisVertical, MapPin, Pen, Trash } from "lucide-react";
import { type BaseProperty } from "@/types.ts";
import TagList from "@/components/tag-list.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useState } from "react";

const Menu = () => {
    return (
        <div className="absolute flex flex-col top-1/2 right-1/12 z-10 p-2 rounded-md text-sm gap-3 *:gap-1 *:items-center  dark:border border-zinc-600">
            <div className="flex">
                <Pen size="16" />
                <p>Edit</p>
            </div>
            <div className="flex text-red-500">
                <Trash size="16" />
                <p>Delete</p>
            </div>
        </div>
    );
};

export const PropertySkeleton = () => {
    return (
        <div className="flex gap-2 items-center p-2 ">
            <Skeleton className="w-16 h-16" />
            <div className="flex flex-col gap-1.5 grow">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-4" />
            </div>
        </div>
    );
};

const AdminPropertyCard = ({ main_image }: BaseProperty) => {
    const [menuShown, setMenuShown] = useState(false);
    return (
        <div className="flex gap-2 items-center rounded-lg p-2 /bg-slate-50 dark:bg-zinc900 dark:text-white">
            <img
                src="/test.jpg"
                className="object-cover w-16 h-16 rounded-lg"
            />
            <div className="flex flex-col gap-1.5 relative">
                <h2 className="line-clamp-1">
                    3 Bedroom flat with boys quarters
                </h2>
                <div className="flex gap-1 items-center opacity-80">
                    <MapPin size="14" />
                    <p className="text-xs">Ikorodu, Lagos</p>

                    <div className="flex gap-3 items-center ml-auto">
                        <button className="transition-all text-yellow-500 active:bg-yellow-500/30 rounded-full p-2">
                            <Pen size="18" />
                        </button>
                        <button className="transition-all text-red-500 active:bg-red-500/30 rounded-full p-2">
                            <Trash size="18" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPropertyCard;
