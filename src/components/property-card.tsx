import { Link } from "react-router";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { type BaseProperty } from "../types.ts";

const PropertyCard = ({
    imgUrl,
    price,
    id,
    title,
    state,
    lga
}: BaseProperty) => {
    const extraInfo = [
        { Icon: BedDouble, message: "3 Bed" },
        { Icon: Bath, message: "2 Bath" },
        { Icon: Ruler, message: "300 km²" }
    ];
    return (
        <article className="flex flex-col gap-2 transition-all ">
            <img className="rounded-lg h-72 object-cover w-full hover:scale-110 hover:shadow" src={imgUrl} />
            <Link to={"/" + String(id)} className="flex flex-col gap-2">
                <h2 className="text-xl font-medium line-clamp-1">{title}</h2>
                <div className="flex gap-1.5 text-sm items-center opacity-80">
                    <MapPin size="14" />
                    <p>{lga + ", " + state}</p>
                </div>
                <div className="flex text-xs gap-2">
                    {extraInfo.map((info, index) => (
                        <div
                            key={index}
                            className="flex gap-1 items-center p-1.5 bg-slate-100 rounded-sm ast:border-0 irst:pl-0"
                        >
                            <info.Icon size="14" />
                            <p>{info.message}</p>
                        </div>
                    ))}
                </div>
            </Link>
            <div className="flex justify-between items-center text-⁰ mt-4">
                <p className="text-2xl font-medium">₦{price}</p>
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
