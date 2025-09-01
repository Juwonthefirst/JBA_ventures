import { Link } from "react-router";
import { MapPin, BedDouble } from "lucide-react";
import { type BaseProperty } from "../types.ts";

const PropertyCard = ({
    imgUrl,
    price,
    id,
    title,
    state,
    lga
}: BaseProperty) => {
    return (
        <article className="flex flex-col gap-2 h-72">
            <img
                className="rounded-2xl h-1/2 object-cover w-full"
                src={imgUrl}
            />
            <Link to={"/" + String(id)} className="flex flex-col gap-1.5">
                <h2 className="text-xl font-medium line-clamp-1">{title}</h2>
                <div className="flex gap-1 text-sm items-center opacity-80">
                    <MapPin size="14" />
                    <p>{lga + ", " + state}</p>
                </div>
                <div className="flex text-xs">
                    {[1, 2].map((_, index) => (
                        <div
                            key={index}
                            className="flex gap-1 items-center px-2 border-black border-r last:border-0 first:pl-0"
                        >
                            <BedDouble size="14" />
                            <p>2 Bed</p>
                        </div>
                    ))}
                </div>
            </Link>
            <div className="flex justify-between items-center text-accent">
                <p className="text-xl font-medium">₦{price}</p>
                <button
                    type="button"
                    className="border-2 px-2 py-1 rounded-xl "
                >
                    Contact us
                </button>
            </div>
        </article>
    );
};

export default PropertyCard;
