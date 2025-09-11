import { Skeleton } from "@/components/ui/skeleton.tsx";
import Icon from "@/components/icon-map.tsx";

export const TagListSkeleton = () => {
    return (
        <ul className="flex gap-2">
            {[1, 2, 3].map((element) => (
                <Skeleton key={element} className="w-1/5 h-7" />
            ))}
        </ul>
    );
};

interface Props {
    tags: {[key: string]: string};
}

const TagList = ({ tags }: Props) => {
    return (
        <ul className="flex text-xs gap-2">
            {Object.keys(tags).map((tagType) => (
                <li
                    key={tagType}
                    className="flex gap-1 items-center p-2 bg-slate-100 rounded-sm dark:bg-zinc-800"
                >
                    <Icon type={tagType} size="14" />
                    <p>{tags[tagType]}</p>
                </li>
            ))}
        </ul>
    );
};

export default TagList;
