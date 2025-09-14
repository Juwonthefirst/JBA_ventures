
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

interface Props {
    value?: string;
    onChange: (newValue: string) => void;
    required?: boolean;
    label: string;
    error?: string;
    placeholder: string;
    options: string[];
}

const SelectInput = ({
    value,
    label,
    placeholder,
    options,
    required = true,
    onChange,
    error
}: Props) => {
    return (
        <div className="flex flex-col min-w-fit w-1/2">
            <label className="text-lg mb-2 w-1/2">
                {required && <span className="text-red-500 text-sm">* </span>}
                {label}
            </label>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger className="transition-all bg-slate-200 w-full dark:bg-zinc-800 border-0">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-black p-2">
                    {options.map((option) => (
                        <SelectItem
                            key={option}
                            className="focus:dark:bg-zinc-800 focus:bg-slate-300"
                            value={option}
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && (
                <p className="text-red-500 text-sm text-center mt-1">{error}</p>
            )}
        </div>
    );
};

export default SelectInput;
