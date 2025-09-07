import { Skeleton } from "@/components/ui/skeleton.tsx";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";

interface TagType {
    Icon: any;
    message: string;
}

interface Props {
    tags?: TagType[];
}

const tagsList = [
    { Icon: BedDouble, message: "3 Bed" },
    { Icon: Bath, message: "2 Bath" },
    { Icon: Ruler, message: "300 km²" }
];

export const TagListSkeleton = () => {
    return (
        <ul className="flex gap-2">
            {[1, 2, 3].map((element, index) => (
                <Skeleton key={element} className="w-1/5 h-7" />
            ))}
        </ul>
    );
};

const TagList = ({ tags = tagsList }: Props) => {
    return (
        <ul className="flex text-xs gap-2">
            {tags.map((tag, index) => (
                <li
                    key={index}
                    className="flex gap-1 items-center p-2 bg-slate-100 rounded-sm dark:bg-zinc-800"
                >
                    <tag.Icon size="14" />
                    <p>{tag.message}</p>
                </li>
            ))}
        </ul>
    );
};

export default TagList;
