import { useState, type ChangeEvent } from "react";

import InputField from "@/components/form/input-field.tsx";
import SelectField from "@/components/form/select-input.tsx";
import Title from "@/components/form/title.tsx";
import Icon from "@/components/icon-map.tsx";
import { type TagType } from "@/types.ts";

interface TagProp {
  type: string;
  text: string;
  onDelete: () => void;
}

const Tag = ({ type, text, onDelete }: TagProp) => {
  return (
    <div className="inline-flex gap-1 items-center p-2 bg-slate-100 rounded-sm dark:bg-zinc-800 text-xs w-fit mr-2 mb-2">
      <Icon type={type} size="14" />
      <p>{text}</p>
      <button type="button" onClick={onDelete} className="ml-1 ">
        x
      </button>
    </div>
  );
};

interface TagInputFieldProps {
  value: TagType;
  onChange?: (newValue: TagType) => void;
}

const TagInputField = ({ onChange, value }: TagInputFieldProps) => {
  //if(!value) value = {}
  const [unFinishedTag, setUnFinishedTag] = useState<{
    type: string;
    text: string;
  }>({ type: "", text: "" });

  const handleDelete = (removedTag: string) => {
    const { [removedTag]: removedTagObject, ...updatedSelectedTag } = value;
    console.log(removedTagObject);
    onChange?.(updatedSelectedTag);
  };

  const handleAdd = () => {
    if (!unFinishedTag.type) return;
    const updatedSelectedTag = {
      ...value,
      [unFinishedTag.type]: unFinishedTag.text,
    };
    onChange?.(updatedSelectedTag);
    setUnFinishedTag({ type: "", text: "" });
  };

  const handleTypeChange = (newValue: string) => {
    setUnFinishedTag({ ...unFinishedTag, type: newValue });
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnFinishedTag({ ...unFinishedTag, text: event.target.value });
  };

  return (
    <div>
      <Title>Tags</Title>
      <div className="flex flex-col gap-4 w-full mb-4">
        <SelectField
          label="Tag"
          placeholder="Pick a tag"
          options={["size", "bed", "bath", "pool"]}
          onChange={handleTypeChange}
          value={unFinishedTag.type}
        />
        <InputField
          placeholder="enter tag text"
          required={false}
          value={unFinishedTag.text}
          onChange={handleTextChange}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-2 py-1 rounded-sm bg-black text-white dark:bg-white dark:text-black self-end"
        >
          Add +
        </button>
      </div>
      <div className="h-40 p-2 border dark:border-white rounded-lg">
        {Object.entries(value).map(([type, text]) => (
          <Tag
            key={type}
            type={type}
            text={text}
            onDelete={() => {
              handleDelete(type);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagInputField;
