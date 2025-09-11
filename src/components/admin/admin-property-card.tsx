import { MapPin, Pen, Trash, LoaderCircle } from "lucide-react";
import { type BaseProperty } from "@/types.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import DeleteConfirmationPopup from "./delete-confirmation-popup.tsx";
import { useState } from "react";

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

interface AdminPropertyCard extends BaseProperty {
    onDelete: () => void;
}

const AdminPropertyCard = ({
    main_image,
    description,
    lga,
    state,
    id,
    onDelete
}: AdminPropertyCard) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="flex gap-2 items-center rounded-lg p-2 bg-slate-100 dark:text-white dark:bg-black">
            <img
                src={main_image}
                className="object-cover w-16 h-16 rounded-lg"
            />
            <div className="flex flex-col gap-1.5 relative">
                <h2 className="line-clamp-1">{description}</h2>
                <div className="flex gap-1 items-center opacity-80">
                    <MapPin size="14" />
                    <p className="text-xs">{lga + ", " + state}</p>

                    <div className="flex gap-3 items-center ml-auto">
                        <button className="transition-all text-yellow-500 active:bg-yellow-500/30 rounded-full p-2">
                            <Pen size="18" />
                        </button>

                        <DeleteConfirmationPopup
                            onConfirm={() => {
                                onDelete();
                                setIsLoading(true);
                            }}
                            className="transition-all text-red-500 active:bg-red-500/30 rounded-full p-2"
                        >
                            {isLoading ? (
                                <LoaderCircle size="18" />
                            ) : (
                                <Trash size="18" />
                            )}
                        </DeleteConfirmationPopup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPropertyCard;
