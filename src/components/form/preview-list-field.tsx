import { useState, useEffect, type RefObject } from "react";

import InputField from "@/components/form/input-field.tsx";

interface Props {
    ref?: RefObject<string[]>;
    onChange: (newList: string[]) => void;
}

const PreviewList = ({ ref, onChange }: Props) => {
    const [benefitsList, setBenefitsList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    if (ref) ref.current = benefitsList;

    useEffect(() => {onChange?.(benefitsList);}, [benefitsList]);

    const handleAdd = () => {
        const newBenefit = inputValue.trim();
        if (!newBenefit) return;
        setBenefitsList([...benefitsList, newBenefit]);
        setInputValue("");
    };

    const handleRemove = (removedBenefitIndex: number) => {
        setBenefitsList(
            benefitsList.filter(
                (_, index) => index !== removedBenefitIndex
            )
        );
    };

    return (
        <div className="flex flex-col">
            <InputField
                label="Benefits"
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
            />
            <button
                type="button"
                onClick={handleAdd}
                className="mt-2 ml-auto py-1 px-2 rounded-md bg-black text-white dark:bg-white dark:text-black"
            >
                Add +
            </button>
            <ul className="mt-6 h-32 w-full border dark:border-white rounded-lg list-disc list-inside text-sm p-2 overflow-y-auto">
                {benefitsList.map((benefit, index) => (
                    <div className="flex justify-between items-center p-1">
                        <li key={index} className="truncate">
                            {benefit}
                        </li>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-xs font-medium bg-white/20 p-1 rounded-full"
                        >
                            X
                        </button>
                    </div>
                ))}
                <li className="p-1 truncate">{inputValue}</li>
            </ul>
        </div>
    );
};

export default PreviewList;
