import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

function Skeleton({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn(
                "bg-slate-300 dark:bg-zinc-600 animate-pulse rounded-md",
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
