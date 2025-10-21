import { Controller, type Control, type UseFormWatch } from "react-hook-form";

import InputField from "@/components/form/input-field.tsx";
import SelectField from "@/components/form/select-input.tsx";
import type { PropertyFormInputs } from "@/types.ts";

import states from "@/assets/data/states.json";
import lgas from "@/assets/data/lgas.json";

interface Props {
  control: Control<PropertyFormInputs>;
  watch: UseFormWatch<PropertyFormInputs>;
}

const LocationSection = ({ control, watch }: Props) => {
  const chosenState = watch("state");
  const lgasData: Record<string, string[]> = lgas;
  const chosenStateLga = lgasData[chosenState] || [];
  return (
    <>
      <Controller
        name="address"
        control={control}
        rules={{ required: "You need to enter the property's address" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputField
            label="Address"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <div className="flex gap-4">
        <Controller
          name="state"
          control={control}
          rules={{
            required: "enter state",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectField
              label="State"
              placeholder="Select a state"
              options={states}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="lga"
          control={control}
          rules={{
            required: "enter lga",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectField
              label="L.G.A"
              placeholder={"Select a LGA"}
              options={chosenStateLga}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
    </>
  );
};

export default LocationSection;
