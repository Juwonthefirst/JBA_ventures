import { useOutletContext } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Component } from "lucide-react";
import { useState } from 'react'

import Form from "@/components/form/form.tsx";
import FileUploadSection from "@/components/admin/property-form/file-upload-section.tsx";
import InfoSection from "@/components/admin/property-form/info-section.tsx";
import LocationSection from "@/components/admin/property-form/location-section.tsx";
import ExtraInfoSection from "@/components/admin/property-form/extra-info-section.tsx";
import Popup from "@/components/popup.tsx";

import type { AdminContext, PropertyFormInputs } from "@/types.ts";
import { clearCache } from "@/hooks/use-cached-fetch.ts";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const CreatePropertyForm = () => {
    const { authToken } = useOutletContext<AdminContext>();
    const { control, handleSubmit, reset } = useForm<PropertyFormInputs>();
    const [status, setStatus] = useState<{
        status?: number;
        message?: string;
    }>({});
    const onSubmit = async () => {
        let inputValues: PropertyFormInputs | undefined;

        const onSubmitSuccess: SubmitHandler<PropertyFormInputs> = (
            submittedData
        ) => {
            inputValues = submittedData;
        };
        await handleSubmit(onSubmitSuccess)();

        if (!inputValues) return;

        return {
            ...inputValues,
            tags: JSON.stringify(inputValues.tags)
        };
    };

    return (
        <Form
            className="p-6"
            url={backendURL + "/api/v1/property/"}
            headers={{ Authorization: `Bearer ${authToken}` }}
            encType="multipart/form-data"
            onSubmit={onSubmit}
            onSuccess={async (response) => {
                //Todo remove response.json after guarantee form works
                // clearCache so new property shows on main admin page
                // clears form inputs
                const data = await response.json();
                clearCache();
                reset();
                alert(JSON.stringify(data));
            }}
            onError={async (response) => {
                //show error message
                if (response instanceof Response) {
                    const data = await response.json();
                    alert(JSON.stringify(data));
                    return;
                }
                alert(response);
            }}
        >
            <FileUploadSection control={control} />
            <InfoSection control={control} />
            <LocationSection control={control} />
            <ExtraInfoSection control={control} />
            <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg"
            >
                Create
            </button>
            <Popup className=""></Popup>
        </Form>
    );
};

export default CreatePropertyForm;
