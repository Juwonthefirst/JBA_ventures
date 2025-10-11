import { Frown } from "lucide-react";

const NoProperty = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={
        "flex flex-col items-center gap-4 opacity-50" + " " + className
      }
    >
      <Frown size={72} />
      <p className="text-sm md:text-base">Looks there are no properties here</p>
    </div>
  );
};

export default NoProperty;
