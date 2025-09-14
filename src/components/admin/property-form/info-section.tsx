import { Controller, type Control } from "react-hook-form";

import InputField, { TextField } from "@/components/form/input-field.tsx";
import PreviewListField from "@/components/form/preview-list-field.tsx";
import type { PropertyFormInputs } from "@/types.ts";

interface Props {
    control: Control<PropertyFormInputs>;
}

const InfoSection = ({ control }: Props) => {
    return (
        <>
            <Controller
                name="description"
                control={control}
                rules={{
                    required: "You need to enter the property description"
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error }
                }) => (
                    <TextField
                        label="Description"
                        onChange={onChange}
                        value={value}
                        error={error?.message}
                    />
                )}
            />
            <Controller
                name="benefits"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <PreviewListField onChange={onChange} value={value} />
                )}
            />
            <Controller
                name="price"
                control={control}
                rules={{ required: "You need to enter the property's price" }}
                render={({
                    field: { onChange, value },
                    fieldState: { error }
                }) => (
                    <InputField
                        label="Price"
                        inputType="number"
                        value={value}
                        onChange={onChange}
                        error={error?.message}
                    />
                )}
            />
        </>
    );
};

export default InfoSection;
