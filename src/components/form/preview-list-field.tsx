import { useState } from "react";

import InputField from "@/components/form/input-field.tsx";

interface Props {
  value: string[];
  onChange?: (newList: string[]) => void;
}

const PreviewList = ({ onChange, value }: Props) => {
  //if(!value) value = []
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const newValue = inputValue.trim();
    if (!newValue) return;
    const updatedList = [...value, newValue];
    setInputValue("");
    onChange?.(updatedList);
  };

  const handleRemove = (removedItemIndex: number) => {
    const updatedList = value.filter((_, index) => index !== removedItemIndex);
    onChange?.(updatedList);
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
        {value.map((item, index) => (
          <li
            key={item + String(index)}
            className="flex justify-between items-center p-1"
          >
            {item}
            <button
              type="button"
              onClick={() => {
                handleRemove(index);
              }}
              className="text-xs font-medium bg-white/20 p-1 rounded-full"
            >
              X
            </button>
          </li>
        ))}
        <li className="p-1 truncate">{inputValue}</li>
      </ul>
    </div>
  );
};

export default PreviewList;
