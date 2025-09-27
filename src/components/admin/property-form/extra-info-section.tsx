import { Controller, type Control } from "react-hook-form";

import TagInputField from "@/components/form/tag-input-field.tsx";
import SelectField from "@/components/form/select-input.tsx";
import type { PropertyFormInputs } from "@/types.ts";
import { propertyOffers, propertyTypes } from "@/helper";

interface Props {
  control: Control<PropertyFormInputs>;
}

const ExtraInfoSection = ({ control }: Props) => {
  return (
    <>
      <Controller
        name="type"
        control={control}
        rules={{
          required: "enter property's type",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectField
            label="Type"
            placeholder="What type of property"
            options={propertyTypes}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="offer"
        control={control}
        rules={{
          required: "enter property's offer",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectField
            label="Offer"
            placeholder=""
            options={propertyOffers}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TagInputField value={value} onChange={onChange} />
        )}
      />
    </>
  );
};

export default ExtraInfoSection;
