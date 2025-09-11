import { useParams, useOutletContext } from "react-router";
import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { UploadIcon } from "lucide-react";

import Form from "@/components/form/form.tsx";
import InputField, { TextField } from "@/components/form/input-field.tsx";
import SelectField from "@/components/form/select-input.tsx";
import FileField from "@/components/form/file-input-field.tsx";
import MultiFileField from "@/components/form/multi-file-input-field.tsx";
import PreviewListField from "@/components/form/preview-list-field.tsx";
import TagInputField from "@/components/form/tag-input-field.tsx";
import type { TagType, AdminContext } from "@/types.ts";

import states from "@/assets/data/states.json";
import lgas from "@/assets/data/lgas.json";

const backendURL = import.meta.env.VITE_BACKEND_URL<string>;

interface PropertyFormInputs {
    main_image: File;
    extra_files: File[];
    description: string;
    benefits: string[];
    address: string;
    state: string;
    lga: string;
    tags: TagType[];
    price: number;
    type: "House" | "Shop" | "Land";
    offer: "Sale" | "Lease" | "Rent";
}

const CreatePropertyForm = () => {
    const { id } = useParams();
    const { authToken } = useOutletContext<AdminContext>();
    const [version, setVersion] = useState(0);
    const { handleSubmit, control } = useForm<PropertyFormInputs>();
    const lgasData: { [key: string]: string[] } = lgas;
    const MAX_FILE_SIZE = 1024 * 1024 * 10;

    const cleanMainImageOutput = (callback: (file: File) => void) => {
        return (files: File[]) => {callback(files[0])};
    };

    const onSubmit: SubmitHandler<PropertyFormInputs> = (data) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value as string | Blob);
        }

        (async () => {
            const response = await fetch(backendURL + "/api/v1/property/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                body: formData
            });
            const data: PropertyFormInputs = await response.json().catch();
            if (!response.ok) throw new Error(JSON.stringify(data));
        })().catch((error) => {
            if (error instanceof Error) alert(error.message);
        });

        return;
    };

    return (
        <Form key={version} className="p-6" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="main_image"
                control={control}
                rules={{
                    required: "You need to upload the property main image"
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <FileField
                        onUpload={cleanMainImageOutput(onChange)}
                        error={error?.message}
                        maxSize={MAX_FILE_SIZE}
                        accept={{ "image/*": [] }}
                        className="p-2"
                    >
                        <div
                            className={
                                "flex flex-col items-center justify-center h-64"
                            }
                        >
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                                <UploadIcon />
                            </div>
                            <p className="my-2 w-full truncate text-wrap font-medium text-sm">
                                Upload property main image
                            </p>
                            <p className="w-full truncate text-wrap text-muted-foreground text-xs">
                                Drag and drop or click to upload
                            </p>
                        </div>
                    </FileField>
                )}
            />
            <Controller
                name="extra_files"
                control={control}
                render={({ field: { onChange } }) => (
                    <MultiFileField
                        onChange={onChange}
                        maxSize={MAX_FILE_SIZE}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                rules={{
                    required: "You need to enter the property description"
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <TextField
                        label="Description"
                        onChange={onChange}
                        error={error?.message}
                    />
                )}
            />
            <Controller
                name="benefits"
                control={control}
                render={({ field: { onChange } }) => (
                    <PreviewListField onChange={onChange} />
                )}
            />
            <Controller
                name="price"
                control={control}
                rules={{ required: "You need to enter the property's price" }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <InputField
                        label="Price"
                        inputType="number"
                        onChange={onChange}
                        error={error?.message}
                    />
                )}
            />
            <Controller
                name="address"
                control={control}
                rules={{ required: "You need to enter the property's address" }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <InputField
                        label="Address"
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
                        required: "enter state"
                    }}
                    render={({
                        field: { onChange },
                        fieldState: { error }
                    }) => (
                        <SelectField
                            label="State"
                            placeholder="Select a state"
                            options={states}
                            onChange={onChange}
                            error={error?.message}
                        />
                    )}
                />
                <Controller
                    name="lga"
                    control={control}
                    rules={{
                        required: "enter lga"
                    }}
                    render={({
                        field: { onChange },
                        fieldState: { error }
                    }) => (
                        <SelectField
                            label="L.G.A"
                            placeholder={"Select a LGA"}
                            options={lgasData["Lagos"]}
                            onChange={onChange}
                            error={error?.message}
                        />
                    )}
                />
            </div>
            <Controller
                name="type"
                control={control}
                rules={{
                    required: "enter property's type"
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectField
                        label="Type"
                        placeholder="What type of property"
                        options={["Shop", "Land", "House"]}
                        onChange={onChange}
                        error={error?.message}
                    />
                )}
            />
            <Controller
                name="offer"
                control={control}
                rules={{
                    required: "enter property's offer"
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectField
                        label="Offer"
                        placeholder=""
                        options={["Sale", "Rent", "Lease"]}
                        onChange={onChange}
                        error={error?.message}
                    />
                )}
            />
            <Controller
                name="tags"
                control={control}
                render={({ field: { onChange } }) => (
                    <TagInputField onChange={onChange} />
                )}
            />
            <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg"
            >
                Create
            </button>
        </Form>
    );
};

export default CreatePropertyForm;
