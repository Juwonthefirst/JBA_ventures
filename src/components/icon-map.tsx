import { Ruler, BedDouble, Bath, type LucideIcon } from "lucide-react";

const iconMap: { [key: string]: LucideIcon } = {
    size: Ruler,
    bed: BedDouble,
    bath: Bath
};

interface Props {
    type: string;
    size?: string;
}

const Icon = ({ type, size }: Props) => {
    const IconComponent = iconMap[type];
    return <IconComponent size={size} />;
};

export default Icon;
